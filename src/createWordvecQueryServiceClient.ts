import * as thrift from "thrift";
import {WordvecQueryService, WordEntry} from "../thrift/vecquery";
import {VecDb} from "./VecDb";
import * as _ from "lodash";

/**
 * Wrapper around thrift client
 */
export const createWordvecQueryServiceClient = (host: string, port: number) : WordvecQueryService.Client => {
  
    const thriftConnection = thrift.createConnection(host, port, {
      transport: thrift.TBufferedTransport,
      protocol: thrift.TBinaryProtocol
    });
    thriftConnection.on('error', (err)=>{
      console.error('Connection error: ' + err);
    })
    
    return thrift.createClient(WordvecQueryService, thriftConnection);
}
