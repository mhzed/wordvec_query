"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const thrift = require("thrift");
const WordvecQueryService = require("../protocol/gen-nodejs/WordvecQueryService");
/**
 * Wrapper around thrift client
 */
class WordvecQueryServiceClient {
    constructor(host, port) {
        this.thriftConnection = thrift.createConnection(host, port, {
            transport: thrift.TBufferedTransport,
            protocol: thrift.TBinaryProtocol
        });
        this.thriftClient = thrift.createClient(WordvecQueryService, this.thriftConnection);
        this.thriftConnection.on('error', (err) => {
            console.error('Connection error: ' + err);
        });
    }
    knnQuery(k, word) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.thriftClient.knnQuery(k, word);
        });
    }
    findVec(word) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.thriftClient.findVec(word);
        });
    }
}
exports.WordvecQueryServiceClient = WordvecQueryServiceClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZUNsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIldvcmR2ZWNRdWVyeVNlcnZpY2VDbGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQyxrRkFBa0Y7QUFJbEY7O0dBRUc7QUFDSDtJQUlFLFlBQVksSUFBWSxFQUFFLElBQVk7UUFFcEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO1lBQzFELFNBQVMsRUFBRSxNQUFNLENBQUMsa0JBQWtCO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsZUFBZTtTQUNqQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQTBCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFRLENBQUM7UUFDbEcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO1lBQ3BDLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRUssUUFBUSxDQUFDLENBQVMsRUFBRSxJQUFZOztZQUNwQyxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBQ0ssT0FBTyxDQUFFLElBQVk7O1lBQ3pCLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLENBQUM7S0FBQTtDQUNGO0FBdEJELDhEQXNCQyJ9