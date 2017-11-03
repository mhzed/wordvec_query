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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3lOZWlnaGJvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBbm5veU5laWdoYm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSw0QkFBNEI7QUFHNUIsK0RBQXdEO0FBQ3hELGlDQUFpQztBQUVqQyxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFRL0I7SUFTRTtRQVBRLGFBQVEsR0FBRyxLQUFLLENBQUM7UUFDbEIsYUFBUSxHQUF3QjtZQUNyQyxTQUFTLEVBQUUsQ0FBQztZQUNaLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLE1BQU0sRUFBRSxDQUFDLENBQUcsaUJBQWlCO1NBQzlCLENBQUM7SUFHRixDQUFDO0lBQUEsQ0FBQztJQUVLLE1BQU0sQ0FBQyxJQUFXO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxDQUFDO0lBQzFFLENBQUM7SUFDTSxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQWlCO1FBQ3BDLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEYsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFDLFNBQVMsRUFBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztRQUNuRixHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEdB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