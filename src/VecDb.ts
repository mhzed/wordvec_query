import {asyncIterateStream} from "async-iterate-stream";
import * as fs from 'fs';
import {Readable, Writable} from 'stream';
import * as byline from 'byline';
import * as _ from 'lodash';

import * as future from "phuture";
import * as thrift from "thrift";
import * as ttypes from "../nmslib-thrift/protocol_types";
import * as QueryService from "../nmslib-thrift/QueryService";

const dbkeyOfI = (i: number)=>{
  return `[${i}]`;
}

export class VecDb {
  
  static createNmsClient(nmsHost: string, nmsPort: number) : any {
    const conn = thrift.createConnection(nmsHost, nmsPort, {
      transport: thrift.TBufferedTransport,
      protocol: thrift.TBinaryProtocol
    });
    conn.on('error', (err)=>{
      console.error(err);
    })
    return thrift.createClient(QueryService as any, conn) as any;
  };
  
  private keyValDb: any;
  private nmsClient: any;
  
  constructor(keyValDb, nmsClient) {
    this.keyValDb = keyValDb;
    this.nmsClient = nmsClient;
  }

  /**
   * ingest a wordvec data file into the keyvaldb
   * @param {"stream".internal.Readable} input the wordvec dump file
   * @returns {Promise<void>}
   */
  async ingestDb(input: Readable) : Promise<void> {
    let i = 0;
    for await (const line of asyncIterateStream(byline(input), false)) {
      let vec = line.toString().split(/\s+/);
      let word = vec[0];
      let wordvec = _.map(vec.slice(1), (n:string)=>{if (n=='.') return 0; else return parseFloat(n);});
      await this.keyValDb.put(word, JSON.stringify(wordvec));
      await this.keyValDb.put(dbkeyOfI(i), word);
      i++;
    }
  }

  async findVec(word:string) : Promise<Array<number>> {
    return JSON.parse(await this.keyValDb.get(word));
  }

  async findWord(i: number) : Promise<string> {
    return (await this.keyValDb.get(dbkeyOfI(i))).toString();
  }

  async findNearestVectors(word: string, k: number) 
      : Promise<Array<{id:number, dist:number, obj:Array<number>, externId:string}>>{
    let vec = await this.findVec(word);
    let query = vec.join(' ');
    
    let response = await this.nmsClient.knnQuery(k, query, true, true);
    for (let r of response) {
      r.obj = _.map(r.obj.split(/\s+/), (n:string)=>parseFloat(n));
    }
    return response;
  }
  
  async findNearestWords(word: string, k: number) : Promise<Array<string>> {
    const vecs = await this.findNearestVectors(word, k);
    return Promise.all(_.map(vecs, (v)=>this.findWord(v.id)));
  }
  
  async close() : Promise<void> {
    await this.keyValDb.close();
  }
  
}


