import * as thrift from "thrift";
import * as url from 'url';
import {WordvecQueryService} from "../thrift/vecquery";

/**
 * Wrapper around thrift client
 */
export class WordvecQueryServiceFactory {

  static createClient(host: string, port: number): WordvecQueryService.Client {

    const thriftConnection = thrift.createConnection(host, port, {
      transport: thrift.TBufferedTransport,
      protocol: thrift.TBinaryProtocol
    });
    thriftConnection.on('error', (err) => {
      console.error('Connection error: ' + err);
    })

    return thrift.createClient(WordvecQueryService, thriftConnection);
  }

  static createServer(handler: WordvecQueryService.IHandler<{}>) {
    return thrift.createServer(WordvecQueryService.Processor, handler);
  }

  static createHttpClient(serverUrl: string) : WordvecQueryService.Client {
    let server = url.parse(serverUrl);
    let conn = thrift.createHttpConnection(server.hostname, parseInt(server.port || '80'), {
      path: server.path,
      headers: {
        'Content-Type': 'application/octet-stream'
      }
    })
    return thrift.createHttpClient(WordvecQueryService, conn);
  }
}