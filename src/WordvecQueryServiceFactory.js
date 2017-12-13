"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thrift = require("thrift");
const url = require("url");
const vecquery_1 = require("../thrift/vecquery");
/**
 * Wrapper around thrift client
 */
class WordvecQueryServiceFactory {
    static createClient(host, port) {
        const thriftConnection = thrift.createConnection(host, port, {
            transport: thrift.TBufferedTransport,
            protocol: thrift.TBinaryProtocol
        });
        thriftConnection.on('error', (err) => {
            console.error('Connection error: ' + err);
        });
        return thrift.createClient(vecquery_1.WordvecQueryService, thriftConnection);
    }
    static createServer(handler) {
        return thrift.createServer(vecquery_1.WordvecQueryService.Processor, handler);
    }
    static createHttpClient(serverUrl) {
        let server = url.parse(serverUrl);
        let conn = thrift.createHttpConnection(server.hostname, parseInt(server.port || '80'), {
            path: server.path,
            headers: {
                'Content-Type': 'application/octet-stream'
            }
        });
        return thrift.createHttpClient(vecquery_1.WordvecQueryService, conn);
    }
}
exports.WordvecQueryServiceFactory = WordvecQueryServiceFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXb3JkdmVjUXVlcnlTZXJ2aWNlRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQUNqQywyQkFBMkI7QUFDM0IsaURBQXVEO0FBRXZEOztHQUVHO0FBQ0g7SUFFRSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVksRUFBRSxJQUFZO1FBRTVDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDM0QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1NBQ2pDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNuQyxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsOEJBQW1CLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUNwRSxDQUFDO0lBRUQsTUFBTSxDQUFDLFlBQVksQ0FBQyxPQUEyQztRQUM3RCxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBbUIsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUN2QyxJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1lBQ3JGLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtZQUNqQixPQUFPLEVBQUU7Z0JBQ1AsY0FBYyxFQUFFLDBCQUEwQjthQUMzQztTQUNGLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsOEJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUQsQ0FBQztDQUNGO0FBN0JELGdFQTZCQyJ9