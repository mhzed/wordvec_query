import {VecNeighbors, VecNeighborEntry} from "./VecNeighbors";
import * as thrift from "thrift";
//import * as QueryService from "../nmslib-thrift/QueryService";//
import {QueryService, ReplyEntry} from "../thrift/nmslib/protocol";
import * as _ from 'lodash';

export class NsmNeighbors implements VecNeighbors {

  private nmsClient : QueryService.Client;
  
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

  
  async knn(vector: number[], k: number) : Promise<VecNeighborEntry[]> {
    let query = vector.join(' ');
    let response = await this.nmsClient.knnQuery(k, query, true, true);
    //console.log('vec: ' + query);
    let ret : VecNeighborEntry[] = _.map(response, (o: ReplyEntry)=>{
      return {
        id: o.id,
        dist: o.dist
      }
    })
    return ret;
  }
} 