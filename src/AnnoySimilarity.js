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
class AnnoySimilarity {
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
        let ret = new AnnoySimilarity();
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
            let ret = new AnnoySimilarity();
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
        let ret = new AnnoySimilarity();
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
exports.AnnoySimilarity = AnnoySimilarity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3lTaW1pbGFyaXR5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiQW5ub3lTaW1pbGFyaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLDRCQUE0QjtBQUc1QiwrREFBd0Q7QUFDeEQsaUNBQWlDO0FBRWpDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQVEvQjtJQVNFO1FBUFEsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLFNBQVM7WUFDakIsTUFBTSxFQUFFLENBQUMsQ0FBRyxpQkFBaUI7U0FDOUIsQ0FBQztJQUdGLENBQUM7SUFBQSxDQUFDO0lBRUssTUFBTSxDQUFDLElBQVc7UUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNNLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBaUI7UUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxlQUFlLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RixHQUFHLENBQUMsUUFBUSxHQUFHLEVBQUMsU0FBUyxFQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQyxDQUFDO1FBQ25GLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMs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