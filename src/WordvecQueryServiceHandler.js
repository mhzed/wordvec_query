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
// import { wordExpressionParser } from "./wordExpression"
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
            // wordExpressionParser(expression)
            return [];
        });
    }
    knnQueryOnVector(k, vector, context) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeConvert(yield this.vecDb.findNearestVectorsOnVector(vector, k));
        });
    }
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
            return typeConvert(yield this.vecDb.findNearestVectors(word, k));
        });
    }
}
exports.WordvecQueryServiceHandler = WordvecQueryServiceHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29yZHZlY1F1ZXJ5U2VydmljZUhhbmRsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXb3JkdmVjUXVlcnlTZXJ2aWNlSGFuZGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsaURBQWtFO0FBRWxFLDRCQUEyQjtBQUMzQiwwREFBMEQ7QUFFMUQ7O0dBRUc7QUFDSCxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQUksRUFBZSxFQUFFO0lBQ3hDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQU0sRUFBRSxFQUFFO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLG9CQUFTLENBQUM7WUFDbkIsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO1lBQ1osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO1lBQ1osTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO1NBQ2pCLENBQUMsQ0FBQTtJQUNKLENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBQ0Q7SUFFUSxvQkFBb0IsQ0FBQyxDQUFTLEVBQUUsVUFBa0IsRUFBRSxPQUFjOztZQUN0RSxtQ0FBbUM7WUFDbkMsTUFBTSxDQUFDLEVBQUUsQ0FBQTtRQUNYLENBQUM7S0FBQTtJQUVLLGdCQUFnQixDQUFDLENBQVMsRUFBRSxNQUFnQixFQUFFLE9BQWM7O1lBQ2hFLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLDBCQUEwQixDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVFLENBQUM7S0FBQTtJQUlELFlBQVksS0FBWTtRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0lBRUssT0FBTyxDQUFDLElBQVk7O1lBQ3hCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksb0JBQVMsQ0FBQztnQkFDbkIsSUFBSTtnQkFDSixJQUFJLEVBQUUsQ0FBQztnQkFDUCxNQUFNLEVBQUcsR0FBRzthQUNiLENBQUMsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxDQUFTLEVBQUUsSUFBWTs7WUFDcEMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbEUsQ0FBQztLQUFBO0NBQ0Y7QUE3QkQsZ0VBNkJDIn0=