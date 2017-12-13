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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXb3JkdmVjUXVlcnlTZXJ2aWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWtFO0FBRWxFLDRCQUEyQjtBQUMzQixvRUFBdUQ7QUFDdkQsOERBQXVEO0FBRXZEOztHQUVHO0FBQ0gsTUFBTSxXQUFXLEdBQUcsQ0FBQyxJQUFJO0lBQ3ZCLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQU07UUFDeEIsTUFBTSxDQUFDLElBQUksb0JBQVMsQ0FBQztZQUNuQixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7WUFDWixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7WUFDWixNQUFNLEVBQUUsQ0FBQyxDQUFDLE1BQU07U0FDakIsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFDRDtJQUVRLG9CQUFvQixDQUFDLENBQVMsRUFBRSxVQUFrQixFQUFFLE9BQWM7O1lBRXRFLElBQUksR0FBRyxHQUFHLE1BQU0sc0JBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztnQkFBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ25DLElBQUksS0FBSyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDL0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM1QixDQUFDO0tBQUE7SUFFSyxnQkFBZ0IsQ0FBQyxDQUFTLEVBQUUsTUFBZ0IsRUFBRSxPQUFjOztZQUNoRSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM1RSxDQUFDO0tBQUE7SUFJRCxZQUFZLEtBQVk7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsc0JBQVEsQ0FBQyxPQUFPLEdBQUcsQ0FBTSxJQUFZO1lBQ25DLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFBLENBQUE7SUFDSCxDQUFDO0lBRUssT0FBTyxDQUFDLElBQVk7O1lBQ3hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksb0JBQVMsQ0FBQztnQkFDbkIsSUFBSTtnQkFDSixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUcsR0FBRzthQUNiLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxDQUFTLEVBQUUsSUFBWTs7WUFDcEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEUsQ0FBQztLQUFBO0NBQ0Y7QUFuQ0QsZ0VBbUNDIn0=