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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZUZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXb3JkdmVjUXVlcnlTZXJ2aWNlRmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGlDQUFpQztBQUNqQywyQkFBMkI7QUFDM0IsaURBQXVEO0FBRXZEOztHQUVHO0FBQ0g7SUFFRSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVksRUFBRSxJQUFZO1FBRTVDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7WUFDM0QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1NBQ2pDLENBQUMsQ0FBQztRQUNILGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO1lBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUE7UUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQTJDO1FBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLDhCQUFtQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQWlCO1FBQ3ZDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLG9CQUFvQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQUU7WUFDckYsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJO1lBQ2pCLE9BQU8sRUFBRTtnQkFDUCxjQUFjLEVBQUUsMEJBQTBCO2FBQzNDO1NBQ0YsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyw4QkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM1RCxDQUFDO0NBQ0Y7QUE3QkQsZ0VBNkJDIn0=