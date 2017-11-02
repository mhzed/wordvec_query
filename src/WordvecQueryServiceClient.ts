import * as thrift from "thrift";
import * as WordvecQueryService from "../protocol/gen-nodejs/WordvecQueryService";
import {VecDb} from "./VecDb";
import * as _ from "lodash";

/**
 * Wrapper around thrift client
 */
export class WordvecQueryServiceClient {
  private thriftConnection;
  private thriftClient;
  
  constructor(host: string, port: number) {
    
    this.thriftConnection = thrift.createConnection(host, port, {
      transport: thrift.TBufferedTransport,
      protocol: thrift.TBinaryProtocol
    });
    this.thriftClient = thrift.createClient(WordvecQueryService as any, this.thriftConnection) as any;
    this.thriftConnection.on('error', (err)=>{
      console.error('Connection error: ' + err);
    })
  }
  
  async knnQuery(k: number, word: string) : Promise<Array<{word: string, dist: number, vector: number[]}>> {
    return await this.thriftClient.knnQuery(k, word);
  }
  async findVec (word: string) : Promise<number[]> {
    return await this.thriftClient.findVec(word);
  }
}
