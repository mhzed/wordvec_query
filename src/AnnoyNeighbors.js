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
const _ = require("lodash");
const async_iterate_stream_1 = require("async-iterate-stream");
const byline = require("byline");
const Annoy = require("annoy");
class AnnoyNeighbors {
    constructor() {
        this.search_k = 10000;
        this.property = {
            dimension: 0,
            method: "Angular",
            ntrees: 0 // let lib decide
        };
    }
    ;
    saveAs(base) {
        let p = this.property;
        this.index.save(`${base}.${p.dimension}.${p.method}.${p.ntrees}.annoy`);
    }
    static loadAs(indexFile) {
        let ret = new AnnoyNeighbors();
        let [base, dimension, method, ntrees] = (/.(\w+).(\w+).(\w+).annoy/i).exec(indexFile);
        base = undefined;
        ret.property = { dimension: parseInt(dimension), method, ntrees: parseInt(ntrees) };
        ret.index = new Annoy(ret.property.dimension, ret.property.method);
        ret.index.load(indexFile);
        return ret;
    }
    /**
     * load vectors into memory index via default property
     *
     * @param {"stream".internal.Readable} vecStream one per per vec, vec is space deliminated
     * @returns {Promise<AnnoySimilarity>}
     */
    static buildIndexFromVector(vecStream, prop) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = new AnnoyNeighbors();
            // read vecfile
            let i = 0;
            ret.property = _.assign(ret.property, prop);
            try {
                for (var _a = __asyncValues(async_iterate_stream_1.asyncIterateStream(byline(vecStream), false)), _b; _b = yield _a.next(), !_b.done;) {
                    const line = yield _b.value;
                    let vec = _.map(line.toString().split(/\s+/), (tok) => tok == '.' ? 0 : parseFloat(tok));
                    if (!ret.index) {
                        ret.property.dimension = vec.length;
                        ret.index = new Annoy(ret.property.dimension, ret.property.method);
                    }
                    ret.index.addItem(i++, vec);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (ret.property.ntrees)
                ret.index.build(ret.property.ntrees);
            else
                ret.index.build();
            return ret;
            var e_1, _c;
        });
    }
    // load index
    static loadIndex(indexFile, prop) {
        let ret = new AnnoyNeighbors();
        ret.property = prop;
        ret.index = new Annoy(ret.property.dimension, ret.property.method);
        ret.index.load(indexFile);
        return ret;
    }
    knn(vector, k) {
        return __awaiter(this, void 0, void 0, function* () {
            let ret = [];
            let { neighbors, distances } = this.index.getNNsByVector(vector, k, this.search_k, true);
            for (let i = 0; i < neighbors.length; i++) {
                let id = neighbors[i];
                let dist = distances[i];
                ret.push({ id, dist });
            }
            return ret;
        });
    }
    setSearchK(k) {
        this.search_k = k;
    }
}
exports.AnnoyNeighbors = AnnoyNeighbors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3lOZWlnaGJvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBbm5veU5laWdoYm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0QkFBNEI7QUFFNUIsK0RBQXdEO0FBQ3hELGlDQUFpQztBQUNqQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFRL0I7SUFTRTtRQVBRLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxDQUFDLENBQUcsaUJBQWlCO1NBQzlCLENBQUM7SUFHRixDQUFDO0lBQUEsQ0FBQztJQUVLLE1BQU0sQ0FBQyxJQUFXO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDTSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQWlCO1FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEYsSUFBSSxHQUFDLFNBQVMsQ0FBQztRQUNmLEdBQUcsQ0FBQyxRQUFRLEdBQUcsRUFBQyxTQUFTLEVBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUM7UUFDbkYsR0FBRyxDQUFDLEtB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