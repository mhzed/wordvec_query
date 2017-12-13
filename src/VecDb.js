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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjRGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWZWNEYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBd0Q7QUFFeEQsaUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUc1QixNQUFNLFFBQVEsR0FBRyxDQUFDLENBQVM7SUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbEIsQ0FBQyxDQUFBO0FBU0EsQ0FBQztBQUVGO0lBS0U7Ozs7T0FJRztJQUNILFlBQVksUUFBUSxFQUFFLG1CQUFpQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDO0lBQ3RDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0csUUFBUSxDQUFDLEtBQWUsRUFBRSxPQUE2Qzs7WUFDM0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDVixHQUFHLENBQUMsQ0FBcUIsSUFBQSxLQUFBLGNBQUEseUNBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBLElBQUE7b0JBQXRELE1BQU0sSUFBSSxpQkFBQSxDQUFBO29CQUNuQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN2QyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksT0FBTyxHQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQVEsT0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxDQUFDO3dCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQUMsSUFBSTt3QkFBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUEs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