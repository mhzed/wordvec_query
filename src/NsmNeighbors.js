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
//import * as QueryService from "../nmslib-thrift/QueryService";//
const protocol_1 = require("../thrift/nmslib/protocol");
const _ = require("lodash");
class NsmNeighbors {
    constructor(nmsHost, nmsPort) {
        const conn = thrift.createConnection(nmsHost, nmsPort, {
            transport: thrift.TBufferedTransport,
            protocol: thrift.TBinaryProtocol
        });
        conn.on('error', (err) => {
            console.error(err);
        });
        this.nmsClient = thrift.createClient(protocol_1.QueryService, conn);
    }
    ;
    knn(vector, k) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = vector.join(' ');
            let response = yield this.nmsClient.knnQuery(k, query, true, true);
            //console.log('vec: ' + query);
            let ret = _.map(response, (o) => {
                return {
                    id: o.id,
                    dist: o.dist
                };
            });
            return ret;
        });
    }
}
exports.NsmNeighbors = NsmNeighbors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnNtTmVpZ2hib3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTnNtTmVpZ2hib3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxpQ0FBaUM7QUFDakMsa0VBQWtFO0FBQ2xFLHdEQUFtRTtBQUNuRSw0QkFBNEI7QUFFNUI7SUFJRSxZQUFZLE9BQWUsRUFBRSxPQUFlO1FBQzFDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFO1lBQ3JELFNBQVMsRUFBRSxNQUFNLENBQUMsa0JBQWtCO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsZUFBZTtTQUNqQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUc7WUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyx1QkFBbUIsRUFBRSxJQUFJLENBQVEsQ0FBQztJQUN6RSxDQUFDO0lBQUEsQ0FBQztJQUdJLEdBQUcsQ0FBQyxNQUFnQixFQUFFLENBQVM7O1lBQ25DLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRSwrQkFBK0I7WUFDL0IsSUFBSSxHQUFHLEdBQXdCLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBYTtnQkFDM0QsTUFBTSxDQUFDO29CQUNMLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDUixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7aUJBQ2IsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7S0FBQTtDQUNGO0FBNUJELG9DQTRCQyJ9