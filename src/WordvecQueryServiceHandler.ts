import {WordvecQueryService, WordEntry} from "../thrift/vecquery";
import {VecDb} from "./VecDb";
import * as _ from "lodash"
import { parse } from "./wordExpression/wordExpression"
import { instance } from "./wordExpression/findWordVec"

/**
 * Wrapper around thrift server, implements protocol
 */
const typeConvert = (vecs): WordEntry[] => {
  return _.map(vecs, (v: any) => {
    return new WordEntry({
      dist: v.dist,
      word: v.word,
      vector: v.vector
    })
  })
}
export class WordvecQueryServiceHandler implements WordvecQueryService.IHandler<{}> {
  
  async knnQueryOnExpression(k: number, expression: string, context?: {}): Promise<WordEntry[]> {
    if (expression.length > 512) throw new Error("Too long");
    let vec = await parse(expression, {});
    if (vec.tolist) vec = vec.tolist();
    let words = await this.vecDb.findNearestVectorsOnVector(vec, k)
    return typeConvert(words);
  }
  
  async knnQueryOnVector(k: number, vector: number[], context?: {}): Promise<WordEntry[]> {
    return typeConvert(await this.vecDb.findNearestVectorsOnVector(vector, k))
  }

  private vecDb : VecDb;
  
  constructor(vecDb: VecDb) {
    this.vecDb = vecDb;
    instance.findVec = async(word: string): Promise<number[]> => {
      return await vecDb.findVec(word);
    }
  }

  async findVec(word: string) : Promise<WordEntry> {
    const vec = await this.vecDb.findVec(word);
    return new WordEntry({
      word,
      dist: 0,
      vector : vec
    });
  }

  async knnQuery(k: number, word: string) : Promise<WordEntry[]> {
    return typeConvert(await this.vecDb.findNearestVectors(word, k))
  }
}
