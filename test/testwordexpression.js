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
const wordExpressionParser = require("../src/wordExpression/wordExpression");
const findWordVec_1 = require("../src/wordExpression/findWordVec");
findWordVec_1.instance.findVec = (word) => __awaiter(this, void 0, void 0, function* () {
    switch (word) {
        case 'word1': return [1, 1, 1];
        case 'word2': return [2, 2, 2];
        case 'word3': return [3, 3, 3];
        default: throw new Error(word + " is not found");
    }
});
exports.exp1 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('word1', {}), [1, 1, 1]);
            //console.log(await wordExpressionParser.parse('word1', {}));
        });
    })().catch(test.ifError).then(test.done);
};
exports.exp2 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('word1 + word2', {}), [3, 3, 3]);
        });
    })().catch(test.ifError).then(test.done);
};
exports.exp3 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('(word1 + word2)/2', {}), [1.5, 1.5, 1.5]);
        });
    })().catch(test.ifError).then(test.done);
};
exports.exp4 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('word1 * 4 / 2', {}), [2, 2, 2]);
        });
    })().catch(test.ifError).then(test.done);
};
exports.exp5 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield wordExpressionParser.parse('wordx', {}));
            test.ok(false, 'should throw');
        });
    })().catch((err) => {
        test.ok(true, 'caught error');
    }).then(test.done);
};
exports.exp6 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(yield wordExpressionParser.parse('wordx + word2', {}));
            test.ok(false, 'should throw');
        });
    })().catch((err) => {
        test.ok(true, 'caught error');
    }).then(test.done);
};
exports.exp7 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('word1+word2-word3', {}), [0, 0, 0]);
        });
    })().catch(test.ifError).then(test.done);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHdvcmRleHByZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdHdvcmRleHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSw2RUFBNEU7QUFFNUUsbUVBQTREO0FBRzVELHNCQUFRLENBQUMsT0FBTyxHQUFHLENBQU8sSUFBWTtJQUNwQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2IsS0FBSyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixLQUFLLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEtBQUssT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsU0FBUyxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxlQUFlLENBQUMsQ0FBQztJQUNuRCxDQUFDO0FBQ0gsQ0FBQyxDQUFBLENBQUE7QUFFWSxRQUFBLElBQUksR0FBRyxDQUFDLElBQW1CO0lBQ3RDLENBQUM7O1lBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsNkRBQTZEO1FBQy9ELENBQUM7S0FBQSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFBO0FBRVksUUFBQSxJQUFJLEdBQUcsQ0FBQyxJQUFtQjtJQUN0QyxDQUFDOztZQUNDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxv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