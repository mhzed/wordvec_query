import {WordvecQueryService, WordEntry} from "../thrift/vecquery";
import {VecDb} from "./VecDb";
import * as _ from "lodash"
// import { wordExpressionParser } from "./wordExpression"

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
export class WordvecQueryServiceHandler implements WordvecQueryService.IHandler<void> {
  
  async knnQueryOnExpression(k: number, expression: string, context?: void): Promise<WordEntry[]> {
    // wordExpressionParser(expression)
    return []
  }
  
  async knnQueryOnVector(k: number, vector: number[], context?: void): Promise<WordEntry[]> {
    return typeConvert(await this.vecDb.findNearestVectorsOnVector(vector, k))
  }

  private vecDb : VecDb;
  
  constructor(vecDb: VecDb) {
    this.vecDb = vecDb;
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
