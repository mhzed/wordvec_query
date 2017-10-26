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
    ingestDb(input) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjRGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWZWNEYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrREFBd0Q7QUFHeEQsaUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUc1QixpQ0FBaUM7QUFFakMsOERBQThEO0FBRTlELE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUztJQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztBQUNsQixDQUFDLENBQUE7QUFFRDtJQUVFLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBZSxFQUFFLE9BQWU7UUFDckQsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7WUFDckQsU0FBUyxFQUFFLE1BQU0sQ0FBQyxrQkFBa0I7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxlQUFlO1NBQ2pDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRztZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBbUIsRUFBRSxJQUFJLENBQVEsQ0FBQztJQUMvRCxDQUFDO0lBQUEsQ0FBQztJQUtGLFlBQVksUUFBUSxFQUFFLFNBQVM7UUFDN0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7O09BSUc7SUFDRyxRQUFRLENBQUMsS0FBZTs7WUFDNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztnQkFDVixHQUFHLENBQUMsQ0FBcUIsSUFBQSxLQUFBLGNBQUEseUNBQWtCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBLElBQUE7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