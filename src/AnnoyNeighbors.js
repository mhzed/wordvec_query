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
const _ = require("lodash");
const Annoy = require("annoy");
class AnnoyNeighbors {
    constructor(prop) {
        this.search_k = 10000;
        this.property = {
            dimension: 0,
            method: "Angular",
            ntrees: 0 // let lib decide
        };
        if (prop)
            this.property = _.assign(this.property, prop);
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
    createIndex(dimension) {
        this.property.dimension = dimension;
        this.index = new Annoy(this.property.dimension, this.property.method);
    }
    addItemToIndex(id, vec) {
        this.index.addItem(id, vec);
    }
    buildIndex() {
        if (this.property.ntrees)
            this.index.build(this.property.ntrees);
        else
            this.index.build();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5ub3lOZWlnaGJvcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJBbm5veU5laWdoYm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ0EsNEJBQTRCO0FBSTVCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQVEvQjtJQVNFLFlBQVksSUFBeUI7UUFQN0IsYUFBUSxHQUFHLEtBQUssQ0FBQztRQUNsQixhQUFRLEdBQXdCO1lBQ3JDLFNBQVMsRUFBRSxDQUFDO1lBQ1osTUFBTSxFQUFFLFNBQVM7WUFDakIsTUFBTSxFQUFFLENBQUMsQ0FBRyxpQkFBaUI7U0FDOUIsQ0FBQztRQUdBLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFBQSxDQUFDO0lBRUssTUFBTSxDQUFDLElBQVc7UUFDdkIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLE1BQU0sUUFBUSxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNNLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBaUI7UUFDcEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxjQUFjLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0RixJQUFJLEdBQUMsU0FBUyxDQUFDO1FBQ2YsR0FBRyxDQUFDLFFBQVEsR0FBRyxFQUFDLFNBQVMsRUFBRyxRQUFRLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUMsQ0FBQztRQUNuRixHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFFTSxXQUFXLENBQUMsU0FBaUI7UUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4RSxDQUFDO0lBQ00sY0FBYyxDQUFDLEVBQVUsRUFBRSxHQUFhO1FBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBQ00sVUFBVTtRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNqRSxJQUFJO1lBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMxQixDQUFDO0lBRUQsYUFBYTtJQUNOLE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBaUIsRUFBRSxJQUF3QjtRQUNqRSxJQUFJLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQy9CLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuRSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVLLEdBQUcsQ0FBQyxNQUFnQixFQUFFLENBQVM7O1lBQ25DLElBQUksR0FBRyxHQUF3QixFQUFFLENBQUM7WUFDbEMsSUFBSSxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkYsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7Z0JBQ3RDLElBQUksRUFBRSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7WUFDdEIsQ0FBQztZQUNELE1BQU0sQ0FBQyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQUE7SUFFRCxVQUFVLENBQUMsQ0FBUztRQUNsQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUE5REQsd0NBOERDIn0=