import * as thrift from "thrift";
import * as WordvecQueryService from "../protocol/gen-nodejs/WordvecQueryService";
import {VecDb} from "./VecDb";
import * as _ from "lodash";

/**
 * Wrapper around thrift server, implements protocol
 */
export class WordvecQueryServiceServer {
  private thriftServer;
  private vecDb : VecDb;
  
  constructor(vecDb: VecDb) {
    this.vecDb = vecDb;
    
    this.thriftServer = thrift.createServer(WordvecQueryService as any, {
      knnQuery : (k: number, word: string, resultcb: (err, result?)=>void )=>{
        this.knnQuery(k, word).catch((err)=>resultcb(err)).then((ret)=>resultcb(null, ret));
      },

      findVec: (word: string, resultcb: (err, result?)=>void) => {
        this.vecDb.findVec(word).catch(resultcb).then((vector)=>resultcb(null, {
          word,
          dist: 0,
          vector 
        }));
      }
    });
    
  }
  
  listen(port: number) {
    this.thriftServer.listen(port);
  }
  
  async knnQuery(k: number, word: string) : Promise<Array<{word: string, dist: number, vector: number[]}>> {
    const vecs = await this.vecDb.findNearestVectors(word, k);
    let ret: { word: string, dist: number, vector: number[] }[] = [];
    for (let i = 0; i < vecs.length; i++) {
      ret.push({
        dist: vecs[i].dist,
        word: vecs[i].word,
        vector: []
      });
    }
    return ret;
  }
}
