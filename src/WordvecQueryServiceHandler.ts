import {WordvecQueryService, WordEntry} from "../thrift/vecquery";
import {VecDb} from "./VecDb";

/**
 * Wrapper around thrift server, implements protocol
 */
export class WordvecQueryServiceHandler implements WordvecQueryService.IHandler<void> {
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
    const vecs = await this.vecDb.findNearestVectors(word, k);
    let ret: WordEntry[] = [];
    for (let i = 0; i < vecs.length; i++) {
      ret.push(new WordEntry({
        dist: vecs[i].dist,
        word: vecs[i].word,
        vector: []
      }));
    }
    return ret;
  }
}
