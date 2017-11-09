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
const vecquery_1 = require("../thrift/vecquery");
/**
 * Wrapper around thrift server, implements protocol
 */
class WordvecQueryServiceHandler {
    constructor(vecDb) {
        this.vecDb = vecDb;
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
exports.WordvecQueryServiceHandler = WordvecQueryServiceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXb3JkdmVjUXVlcnlTZXJ2aWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWtFO0FBR2xFOztHQUVHO0FBQ0g7SUFHRSxZQUFZLEtBQVk7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFFckIsQ0FBQztJQUdLLE9BQU8sQ0FBQyxJQUFZOztZQUN4QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLG9CQUFTLENBQUM7Z0JBQ25CLElBQUk7Z0JBQ0osSUFBSSxFQUFFLENBQUM7Z0JBQ1AsTUFBTSxFQUFHLEdBQUc7YUFDYixDQUFDLENBQUM7UUFDTCxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsQ0FBUyxFQUFFLElBQVk7O1lBQ3BDLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDMUQsSUFBSSxHQUFHLEdBQWdCLEVBQUUsQ0FBQztZQUMxQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDckMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLG9CQUFTLENBQUM7b0JBQ3JCLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDbEIsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUNsQixNQUFNLEVBQUUsRUFBRTtpQkFDWCxDQUFDLENBQUMsQ0FBQztZQUNOLENBQUM7WUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2IsQ0FBQztLQUFBO0NBQ0Y7QUE5QkQsZ0VBOEJDIn0=