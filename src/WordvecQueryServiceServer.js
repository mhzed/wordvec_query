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
const vecquery_1 = require("../thrift/vecquery");
/**
 * Wrapper around thrift server, implements protocol
 */
class WordvecQueryServiceServer {
    constructor(vecDb) {
        this.vecDb = vecDb;
        this.thriftServer = thrift.createServer(vecquery_1.WordvecQueryService.Processor, this);
    }
    listen(port) {
        this.thriftServer.listen(port);
    }
    findVec(word) {
        return __awaiter(this, void 0, void 0, function* () {
            const vec = yield this.vecDb.findVec(word);
            return new vecquery_1.WordEntry({
                word,
                dist: 0,
                vector: vec
            });
        });
    }
    knnQuery(k, word) {
        return __awaiter(this, void 0, void 0, function* () {
            const vecs = yield this.vecDb.findNearestVectors(word, k);
            let ret = [];
            for (let i = 0; i < vecs.length; i++) {
                ret.push(new vecquery_1.WordEntry({
                    dist: vecs[i].dist,
                    word: vecs[i].word,
                    vector: []
                }));
            }
            return ret;
        });
    }
}
exports.WordvecQueryServiceServer = WordvecQueryServiceServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZVNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIldvcmR2ZWNRdWVyeVNlcnZpY2VTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQyxpREFBa0U7QUFJbEU7O0dBRUc7QUFDSDtJQUtFLFlBQVksS0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNuQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsOEJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRUssT0FBTyxDQUFDLElBQVk7O1lBQ3hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksb0JBQVMsQ0FBQztnQkFDbkIsSUFBSTtnQkFDSixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUcsR0FBRzthQUNiLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxDQUFTLEVBQUUsSUFBWTs7WUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRCxJQUFJLEdBQUcsR0FBZ0IsRUFBRSxDQUFDO1lBQzFCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNyQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksb0JBQVMsQ0FBQztvQkFDckIsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUNsQixJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ2xCLE1BQU0sRUFBRSxFQUFFO2lCQUNYLENBQUMsQ0FBQyxDQUFDO1lBQ04sQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQUE7Q0FDRjtBQW5DRCw4REFtQ0MifQ==