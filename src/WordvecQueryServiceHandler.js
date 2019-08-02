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
const _ = require("lodash");
const wordExpression_1 = require("./wordExpression/wordExpression");
const findWordVec_1 = require("./wordExpression/findWordVec");
/**
 * Wrapper around thrift server, implements protocol
 */
const typeConvert = (vecs) => {
    return _.map(vecs, (v) => {
        return new vecquery_1.WordEntry({
            dist: v.dist,
            word: v.word,
            vector: v.vector
        });
    });
};
class WordvecQueryServiceHandler {
    knnQueryOnExpression(k, expression, context) {
        return __awaiter(this, void 0, void 0, function* () {
            if (expression.length > 512)
                throw new Error("Too long");
            let vec = yield wordExpression_1.parse(expression, {});
            if (vec.tolist)
                vec = vec.tolist();
            let words = yield this.vecDb.findNearestVectorsOnVector(vec, k);
            return typeConvert(words);
        });
    }
    knnQueryOnVector(k, vector, context) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeConvert(yield this.vecDb.findNearestVectorsOnVector(vector, k));
        });
    }
    constructor(vecDb) {
        this.vecDb = vecDb;
        findWordVec_1.instance.findVec = (word) => __awaiter(this, void 0, void 0, function* () {
            return yield vecDb.findVec(word);
        });
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
            return typeConvert(yield this.vecDb.findNearestVectors(word, k));
        });
    }
}
exports.WordvecQueryServiceHandler = WordvecQueryServiceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXb3JkdmVjUXVlcnlTZXJ2aWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWtFO0FBRWxFLDRCQUEyQjtBQUMzQixvRUFBdUQ7QUFDdkQsOERBQXVEO0FBRXZEOztHQUVHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJLEVBQWUsRUFBRTtJQUN4QyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUM1QixNQUFNLENBQUMsSUFBSSxvQkFBUyxDQUFDO1lBQ25CLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNaLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtZQUNaLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTTtTQUNqQixDQUFDLENBQUE7SUFDSixDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUMsQ0FBQTtBQUNEO0lBRVEsb0JBQW9CLENBQUMsQ0FBUyxFQUFFLFVBQWtCLEVBQUUsT0FBWTs7WUFDcEUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCxJQUFJLEdBQUcsR0FBRyxNQUFNLHNCQUFLLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNuQyxJQUFJLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQy9ELE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsQ0FBUyxFQUFFLE1BQWdCLEVBQUUsT0FBWTs7WUFDOUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDNUUsQ0FBQztLQUFBO0lBSUQsWUFBWSxLQUFZO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLHNCQUFRLENBQUMsT0FBTyxHQUFHLENBQU0sSUFBWSxFQUFxQixFQUFFO1lBQzFELE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDO0lBRUssT0FBTyxDQUFDLElBQVk7O1lBQ3hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksb0JBQVMsQ0FBQztnQkFDbkIsSUFBSTtnQkFDSixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUcsR0FBRzthQUNiLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxDQUFTLEVBQUUsSUFBWTs7WUFDcEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEUsQ0FBQztLQUFBO0NBQ0Y7QUFuQ0QsZ0VBbUNDIn0=