import {asyncIterateStream} from "async-iterate-stream";
import {Readable} from 'stream';
import * as byline from 'byline';
import * as _ from 'lodash';
import {VecNeighbors, VecNeighborEntry} from "./VecNeighbors";

const dbkeyOfI = (i: number)=>{
  return `[${i}]`;
}

/**
 * The type for returned result
 */
export interface VecEntry {
  word: string,       // the word
  dist: number,   // distance from the lookup vector
  vector: number[]    // the Wordvec of word
};

export class VecDb {
  
  private keyValDb: any;
  private neighbor: VecNeighbors;

  /**
   * 
   * @param keyValDb  the level db instance
   * @param {VecSimilarity} similarityInterface for vector similarity lookup
   */
  constructor(keyValDb, similarityInterface: VecNeighbors) {
    this.keyValDb = keyValDb;
    this.neighbor = similarityInterface;
  }

  async store(word: string, wordvec: number[], id: number): Promise<void> {
    await this.keyValDb.put(word, JSON.stringify(wordvec));
    await this.keyValDb.put(dbkeyOfI(id), word);
  }
  /**
   * Ingest a raw wordvec stream: 1. into leveldb, 2. call vecHook for each line processed
   * 
   * @param {"stream".internal.Readable} input of format: 1 wordvec per line, word as the first token, the rest is the 
   *        vector of numbers 
   * @param {(word: string, vec: number[]) => void} vecHook called for each line processed 
   * @returns {Promise<void>}
   */
  async ingestDb(input: Readable, vecHook: (word: string, vec: number[], id: number)=>void,
    errCb: (iline: number, line: string, msg: string)=>void ) : Promise<void> {
    let id = 0, iline=0;
    let dimension = undefined;
    for await (const line of asyncIterateStream(byline(input), false)) {
      iline++;
      let vec = _.trim(line.toString()).split(/\s+/);
      if (iline==1 && vec.length==2) continue;  // fasttext dump: first line is line count and dimensions, ignore
      try {
        let word = vec[0];
        let wordvec : number[] = _(vec.slice(1)).map((n:string)=>{
          if (n=='.') return 0; else return parseFloat(n);
        }).filter((e)=>_.isFinite(e)).value();
        if (dimension == undefined) dimension = wordvec.length;

        if (word === null || word === '') {
          errCb(iline, line, "no word")
        } else if (wordvec.length != dimension) {
          errCb(iline, line, "bad dimension " + wordvec.length) 
        }
        else {
          await this.keyValDb.put(word, JSON.stringify(wordvec));
          await this.keyValDb.put(dbkeyOfI(id), word);
          if (vecHook) vecHook(word, wordvec, id);
          id++; // id keesp track of valid lines only
        }
      } catch (e) {
        throw new Error("Line " + iline + ": " + line + "\n" + (e.stack || e.toString()));
      }
    }
  }

  /**
   * find vector for word 
   * @param {string} word
   * @returns {Promise<Array<number>>}
   */
  async findVec(word:string) : Promise<Array<number>> {
    return JSON.parse(await this.keyValDb.get(word));
  }

  /**
   * find word given 'id', which is just a 0-based index.  'id' is returned by the VecSimilarity interface.
   * @param {number} i
   * @returns {Promise<string>}
   */
  async findWord(i: number) : Promise<string> {
    return (await this.keyValDb.get(dbkeyOfI(i))).toString();
  }

  /**
   * 
   * @param {string} word
   * @param {number} k
   * @returns {Promise<Array<VecEntry>>}
   */
  async findNearestVectors(word: string, k: number) : Promise<Array<VecEntry>>{
    const vec : number[] = await this.findVec(word);
    return this.findNearestVectorsOnVector(vec, k);
  }

  async findNearestVectorsOnVector(vec: number[], k: number) : Promise<Array<VecEntry>>{
    const neighborVecs : VecNeighborEntry[] = await this.neighbor.knn(vec, k);
    const neighborWords : string[] = await Promise.all(_.map(neighborVecs, (v) => this.findWord(v.id)));
    const neighborWordvecs = await Promise.all(_.map(neighborWords, (w) => this.findVec(w)));
    
    let result : VecEntry[] = [];
    for (let i=0; i<neighborWords.length; i++) {
      let dist = neighborVecs[i].dist;
      let word = neighborWords[i];
      let vector: number[] = neighborWordvecs[i];
      result.push({word, dist, vector});
    }
    return result;
  }

  async close() : Promise<void> {
    await this.keyValDb.close();
  }
  
}


