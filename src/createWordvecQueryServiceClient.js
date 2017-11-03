"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const thrift = require("thrift");
const vecquery_1 = require("../thrift/vecquery");
/**
 * Wrapper around thrift client
 */
exports.createWordvecQueryServiceClient = (host, port) => {
    const thriftConnection = thrift.createConnection(host, port, {
        transport: thrift.TBufferedTransport,
        protocol: thrift.TBinaryProtocol
    });
    thriftConnection.on('error', (err) => {
        console.error('Connection error: ' + err);
    });
    return thrift.createClient(vecquery_1.WordvecQueryService, thriftConnection);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlV29yZHZlY1F1ZXJ5U2VydmljZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNyZWF0ZVdvcmR2ZWNRdWVyeVNlcnZpY2VDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxpQ0FBaUM7QUFDakMsaURBQWtFO0FBSWxFOztHQUVHO0FBQ1UsUUFBQSwrQkFBK0IsR0FBRyxDQUFDLElBQVksRUFBRSxJQUFZO0lBRXRFLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7UUFDM0QsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7UUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxlQUFlO0tBQ2pDLENBQUMsQ0FBQztJQUNILGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO1FBQy9CLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFDNUMsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyw4QkFBbUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQSJ9