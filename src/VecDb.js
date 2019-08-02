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
    store(word, wordvec, id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.keyValDb.put(word, JSON.stringify(wordvec));
            yield this.keyValDb.put(dbkeyOfI(id), word);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVjRGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJWZWNEYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsNEJBQTRCO0FBRzVCLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBUyxFQUFDLEVBQUU7SUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbEIsQ0FBQyxDQUFBO0FBU0EsQ0FBQztBQUVGO0lBS0U7Ozs7T0FJRztJQUNILFlBQVksUUFBUSxFQUFFLG1CQUFpQztRQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDO0lBQ3RDLENBQUM7SUFFSyxLQUFLLENBQUMsSUFBWSxFQUFFLE9BQWlCLEVBQUUsRUFBVTs7WUFDckQsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDRyxPQUFPLENBQUMsSUFBVzs7WUFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVEOzs7O09BSUc7SUFDRyxRQUFRLENBQUMsQ0FBUzs7WUFDdEIsTUFBTSxDQUFDLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNELENBQUM7S0FBQTtJQUVEOzs7OztPQUtHO0lBQ0csa0JBQWtCLENBQUMsSUFBWSxFQUFFLENBQVM7O1lBQzlDLE1BQU0sR0FBRyxHQUFjLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSywwQkFBMEIsQ0FBQyxHQUFhLEVBQUUsQ0FBUzs7WUFDdkQsTUFBTSxZQUFZLEdBQXdCLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzFFLE1BQU0sYUFBYSxHQUFjLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BHLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6RixJQUFJLE1BQU0sR0FBZ0IsRUFBRSxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBRSxDQUFDLEdBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUMxQyxJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNoQyxJQUFJLElBQUksR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLElBQUksTUFBTSxHQUFhLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ3BDLENBQUM7WUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUM7S0FBQTtJQUVLLEtBQUs7O1lBQ1QsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzlCLENBQUM7S0FBQTtDQUVGO0FBcEVELHNCQW9FQyJ9