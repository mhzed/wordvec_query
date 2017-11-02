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
 * Wrapper around thrift server, implements protocol
 */
class WordvecQueryServiceServer {
    constructor(vecDb) {
        this.vecDb = vecDb;
        this.thriftServer = thrift.createServer(WordvecQueryService, {
            knnQuery: (k, word, resultcb) => {
                this.knnQuery(k, word).catch((err) => resultcb(err)).then((ret) => resultcb(null, ret));
            },
            findVec: (word, resultcb) => {
                this.vecDb.findVec(word).catch(resultcb).then((vector) => resultcb(null, {
                    word,
                    dist: 0,
                    vector
                }));
            }
        });
    }
    listen(port) {
        this.thriftServer.listen(port);
    }
    knnQuery(k, word) {
        return __awaiter(this, void 0, void 0, function* () {
            const vecs = yield this.vecDb.findNearestVectors(word, k);
            let ret = [];
            for (let i = 0; i < vecs.length; i++) {
                ret.push({
                    dist: vecs[i].dist,
                    word: vecs[i].word,
                    vector: []
                });
            }
            return ret;
        });
    }
}
exports.WordvecQueryServiceServer = WordvecQueryServiceServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZVNlcnZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIldvcmR2ZWNRdWVyeVNlcnZpY2VTZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLGlDQUFpQztBQUNqQyxrRkFBa0Y7QUFJbEY7O0dBRUc7QUFDSDtJQUlFLFlBQVksS0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUVuQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsbUJBQTBCLEVBQUU7WUFDbEUsUUFBUSxFQUFHLENBQUMsQ0FBUyxFQUFFLElBQVksRUFBRSxRQUE4QjtnQkFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsS0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDdEYsQ0FBQztZQUVELE9BQU8sRUFBRSxDQUFDLElBQVksRUFBRSxRQUE4QjtnQkFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFO29CQUNyRSxJQUFJO29CQUNKLElBQUksRUFBRSxDQUFDO29CQUNQLE1BQU07aUJBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDTixDQUFDO1NBQ0YsQ0FBQyxDQUFDO0lBRUwsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFSyxRQUFRLENBQUMsQ0FBUyxFQUFFLElBQVk7O1lBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxHQUFHLEdBQXVELEVBQUUsQ0FBQztZQUNqRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckMsR0FBRyxDQUFDLElBQUksQ0FBQztvQkFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ2xCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDbEIsTUFBTSxFQUFFLEVBQUU7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQUE7Q0FDRjtBQXZDRCw4REF1Q0MifQ==