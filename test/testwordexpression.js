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
        case 'food': return [4, 4, 4];
        case 'root': return [5, 5, 5];
        case 'coffee': return [6, 6, 6];
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
exports.exp8 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('food-root+coffee', {}), [5, 5, 5]);
        });
    })().catch(test.ifError).then(test.done);
};
exports.exp9 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('-food', {}), [-4, -4, -4]);
        });
    })().catch(test.ifError).then(test.done);
};
exports.exp10 = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            test.deepEqual(yield wordExpressionParser.parse('-(food-root+coffee)', {}), [-5, -5, -5]);
        });
    })().catch(test.ifError).then(test.done);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHdvcmRleHByZXNzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGVzdHdvcmRleHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFFQSw2RUFBNEU7QUFFNUUsbUVBQTREO0FBRzVELHNCQUFRLENBQUMsT0FBTyxHQUFHLENBQU8sSUFBWSxFQUFxQixFQUFFO0lBQzNELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDYixLQUFLLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEtBQUssT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0IsS0FBSyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixLQUFLLE1BQU0sRUFBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdCLEtBQUssTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUIsS0FBSyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUM3QixTQUFTLE1BQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7QUFDSCxDQUFDLENBQUEsQ0FBQTtBQUVZLFFBQUEsSUFBSSxHQUFHLENBQUMsSUFBbUIsRUFBRSxFQUFFO0lBQzFDLENBQUM7O1lBQ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMs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