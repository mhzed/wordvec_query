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
const thrift = require("thrift");
const QueryService = require("../nmslib-thrift/QueryService");
const dbkeyOfI = (i) => {
    return `[${i}]`;
};
class VecDb {
    static createNmsClient(nmsHost, nmsPort) {
        const conn = thrift.createConnection(nmsHost, nmsPort, {
            transport: thrift.TBufferedTransport,
            protocol: thrift.TBinaryProtocol
        });
        conn.on('error', (err) => {
            console.error(err);
        });
        return thrift.createClient(QueryService, conn);
    }
    ;
    constructor(keyValDb, nmsClient) {
        this.keyValDb = keyValDb;
        this.nmsClient = nmsClient;
    }
    /**
     * ingest a wordvec data file into the keyvaldb
     * @param {"stream".internal.Readable} input the wordvec dump file
     * @returns {Promise<void>}
     */
    ingestDb(input, vectorStream) {
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
                    if (vectorStream)
                        vectorStream.write(wordvec.join(' '));
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
    findVec(word) {
        return __awaiter(this, void 0, void 0, function* () {
            return JSON.parse(yield this.keyValDb.get(word));
        });
    }
    findWord(i) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.keyValDb.get(dbkeyOfI(i))).toString();
        });
    }
    findNearestVectors(word, k) {
        return __awaiter(this, void 0, void 0, function* () {
            let vec = yield this.findVec(word);
            let query = vec.join(' ');
            let response = yield this.nmsClient.knnQuery(k, query, true, true);
            for (let r of response) {
                r.obj = _.map(r.obj.split(/\s+/), (n) => parseFloat(n));
            }
            return response;
        });
    }
    findNearestWords(word, k) {
        return __awaiter(this, void 0, void 0, function* () {
            const vecs = yield this.findNearestVectors(word, k);
            return Promise.all(_.map(vecs, (v) => this.findWord(v.id)));
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.keyValDb.close();
        });
    }
}
exports.VecDb = VecDb;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjRGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWZWNEYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBd0Q7QUFHeEQsaUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUc1QixpQ0FBaUM7QUFFakMsOERBQThEO0FBRTlELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUztJQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFRDtJQUVFLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZSxFQUFFLE9BQWU7UUFDckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7WUFDckQsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1NBQ2pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRztZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBbUIsRUFBRSxJQUFJLENBQVEsQ0FBQztJQUMvRCxDQUFDO0lBQUEsQ0FBQztJQUtGLFlBQVksUUFBUSxFQUFFLFNBQVM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDRyxRQUFRLENBQUMsS0FBZSxFQUFFLFlBQXlDOztZQUN2RSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O2dCQUNWLEdBQUcsQ0FBQyxDQUFxQixJQUFBLEtBQUEsY0FBQSx5Q0FBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFD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