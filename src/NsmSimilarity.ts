import {VecSimilarity, VecSimilarityEntry} from "./VecSimilarity";
import * as thrift from "thrift";
import * as QueryService from "../nmslib-thrift/QueryService";
import * as _ from 'lodash';

export class NsmSimilarity implements VecSimilarity {

  private nmsClient : any;
  
  constructor(nmsHost: string, nmsPort: number) {
    const conn = thrift.createConnection(nmsHost, nmsPort, {
      transport: thrift.TBufferedTransport,
      protocol: thrift.TBinaryProtocol
    });
    conn.on('error', (err)=>{
      console.error(err);
    })
    this.nmsClient = thrift.createClient(QueryService as any, conn) as any;
  };

  
  async knn(vector: number[], k: number) : Promise<VecSimilarityEntry[]> {
    let query = vector.join(' ');
    let response = await this.nmsClient.knnQuery(k, query, true, true);
    //console.log('vec: ' + query);
    let ret : VecSimilarityEntry[] = _.map(response, (o:any)=>{
      return {
        id: o.id,
        dist: o.dist
      }
    })
    return ret;
  }
} 