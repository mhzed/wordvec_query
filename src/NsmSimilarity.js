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
const QueryService = require("../nmslib-thrift/QueryService");
const _ = require("lodash");
class NsmSimilarity {
    constructor(nmsHost, nmsPort) {
        const conn = thrift.createConnection(nmsHost, nmsPort, {
            transport: thrift.TBufferedTransport,
            protocol: thrift.TBinaryProtocol
        });
        conn.on('error', (err) => {
            console.error(err);
        });
        this.nmsClient = thrift.createClient(QueryService, conn);
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
exports.NsmSimilarity = NsmSimilarity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnNtU2ltaWxhcml0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk5zbVNpbWlsYXJpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUNBLGlDQUFpQztBQUNqQyw4REFBOEQ7QUFDOUQsNEJBQTRCO0FBRTVCO0lBSUUsWUFBWSxPQUFlLEVBQUUsT0FBZTtRQUMxQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRTtZQUNyRCxTQUFTLEVBQUUsTUFBTSxDQUFDLGtCQUFrQjtZQUNwQyxRQUFRLEVBQUUsTUFBTSxDQUFDLGVBQWU7U0FDakMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBbUIsRUFBRSxJQUFJLENBQVEsQ0FBQztJQUN6RSxDQUFDO0lBQUEsQ0FBQztJQUdJLEdBQUcsQ0FBQyxNQUFnQixFQUFFLENBQVM7O1lBQ25DLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0IsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRSwrQkFBK0I7WUFDL0IsSUFBSSxHQUFHLEdBQTBCLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBSztnQkFDckQsTUFBTSxDQUFDO29CQUNMLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtvQkFDUixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7aUJBQ2IsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLEdBQUcsQ0FBQztRQUNiLENBQUM7S0FBQTtDQUNGO0FBNUJELHNDQTRCQyJ9