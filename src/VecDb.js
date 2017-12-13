"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
const async_iterate_stream_1 = require("async-iterate-stream");
const byline = require("byline");
const _ = require("lodash");
const dbkeyOfI = (i) => {
    return `[${i}]`;
};
;
class VecDb {
    /**
     *
     * @param keyValDb  the level db instance
     * @param {VecSimilarity} similarityInterface for vector similarity lookup
     */
    constructor(keyValDb, similarityInterface) {
        this.keyValDb = keyValDb;
        this.neighbor = similarityInterface;
    }
    /**
     * Ingest a raw wordvec stream: 1. into leveldb, 2. call vecHook for each line processed
     *
     * @param {"stream".internal.Readable} input of format: 1 wordvec per line, word as the first token, the rest is the
     *        vector of numbers
     * @param {(word: string, vec: number[]) => void} vecHook called for each line processed
     * @returns {Promise<void>}
     */
    ingestDb(input, vecHook) {
        return __awaiter(this, void 0, void 0, function* () {
            let i = 0;
            try {
                for (var _a = __asyncValues(async_iterate_stream_1.asyncIterateStream(byline(input), false)), _b; _b = yield _a.next(), !_b.done;) {
                    const line = yield _b.value;
                    let vec = line.toString().split(/\s+/);
                    let word = vec[0];
                    let wordvec = _.map(vec.slice(1), (n) => { if (n == '.')
                        return 0;
                    else
                        return parseFloat(n); });
                    yield this.keyValDb.put(word, JSON.stringify(wordvec));
                    yield this.keyValDb.put(dbkeyOfI(i), word);
                    if (vecHook)
                        vecHook(word, wordvec);
                    i++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            var e_1, _c;
        });
    }
    /**
     * find vector for word
     * @param {string} word
     * @returns {Promise<Array<number>>}
     */
    findVec(word) {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(yield this.keyValDb.get(word));
        });
    }
    /**
     * find word given 'id', which is just a 0-based index.  'id' is returned by the VecSimilarity interface.
     * @param {number} i
     * @returns {Promise<string>}
     */
    findWord(i) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.keyValDb.get(dbkeyOfI(i))).toString();
        });
    }
    /**
     *
     * @param {string} word
     * @param {number} k
     * @returns {Promise<Array<VecEntry>>}
     */
    findNearestVectors(word, k) {
        return __awaiter(this, void 0, void 0, function* () {
            const vec = yield this.findVec(word);
            return this.findNearestVectorsOnVector(vec, k);
        });
    }
    findNearestVectorsOnVector(vec, k) {
        return __awaiter(this, void 0, void 0, function* () {
            const neighborVecs = yield this.neighbor.knn(vec, k);
            const neighborWords = yield Promise.all(_.map(neighborVecs, (v) => this.findWord(v.id)));
            const neighborWordvecs = yield Promise.all(_.map(neighborWords, (w) => this.findVec(w)));
            let result = [];
            for (let i = 0; i < neighborWords.length; i++) {
                let dist = neighborVecs[i].dist;
                let word = neighborWords[i];
                let vector = neighborWordvecs[i];
                result.push({ word, dist, vector });
            }
            return result;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.keyValDb.close();
        });
    }
}
exports.VecDb = VecDb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjRGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWZWNEYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBd0Q7QUFFeEQsaUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUc1QixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQVMsRUFBQyxFQUFFO0lBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ2xCLENBQUMsQ0FBQTtBQVNBLENBQUM7QUFFRjtJQUtFOzs7O09BSUc7SUFDSCxZQUFZLFFBQVEsRUFBRSxtQkFBaUM7UUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNHLFFBQVEsQ0FBQyxLQUFlLEVBQUUsT0FBNkM7O1lBQzNFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Z0JBQ1YsR0FBRyxDQUFDLENBQXFCLElBQUEsS0FBQSxjQUFBLHlDQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQSxJQUFBO29CQUF0RCxNQUFNLElBQUksaUJBQUEsQ0FBQTtvQkFDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDdkMsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsQixJQUFJLE9BQU8sR0FBYyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFRLEVBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBRSxHQUFHLENBQUM7d0JBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFBQyxJQUFJO3dCQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMs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