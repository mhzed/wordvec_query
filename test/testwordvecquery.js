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
const path = require("path");
const fs = require("fs");
const fsextra = require("fs-extra");
const levelup = require("levelup");
const pmfy = require("pmfy");
const leveldown_1 = require("leveldown");
const VecDb_1 = require("../src/VecDb");
const testDataFile = path.resolve(__dirname, 'glove.6B.300d.100l.txt');
const dbPath = path.resolve(__dirname, 'db');
const fse = pmfy(fsextra);
exports.createdb = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fse.remove(dbPath);
            const db = new VecDb_1.VecDb(levelup(leveldown_1.default(dbPath)), null);
            yield db.ingestDb(fs.createReadStream(testDataFile));
            yield db.close();
        });
    })().catch(test.ifError).then(test.done);
};
exports.testleveldb = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new VecDb_1.VecDb(levelup(leveldown_1.default(dbPath)), null);
            let vec = yield db.findVec('was');
            test.equals(vec.length, 300, "300 long");
            let word = yield db.findWord(10); // 11th line
            test.equals(word, 'for', 'found word');
            yield db.close();
        });
    })().catch(test.ifError).then(test.done);
};
// exports.findNearest = (test: nodeunit.Test) => {
//   (async function body() {
//
//     const db  = new VecDb(levelup(leveldown(dbPath)), nmsClient);
//     await db.findNearestVectors('as', 10);
//     await db.close();
//   })().catch(test.ifError).then(test.done);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHdvcmR2ZWNxdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3R3b3JkdmVjcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IseUNBQWtDO0FBQ2xDLHdDQUFtQztBQUVuQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUxQixPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBbUI7SUFDckMsQ0FBQzs7WUFDQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsTUFBTSxFQUFFLEdBQUksSUFBSSxhQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4RCxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUE7QUFFRCxPQUFPLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBbUI7SUFDeEMsQ0FBQzs7WUFDQyxNQUFNLEVBQUUsR0FBSSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hELElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVk7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FBQSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFBO0FBR0QsbURBQW1EO0FBQ25ELDZCQUE2QjtBQUM3QixFQUFFO0FBQ0Ysb0VBQW9FO0FBQ3BFLDZDQUE2QztBQUM3Qyx3QkFBd0I7QUFDeEIsOENBQThDO0FBQzlDLElBQUkifQ==