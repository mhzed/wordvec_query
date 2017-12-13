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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHdvcmR2ZWNxdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3R3b3JkdmVjcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IseUNBQWtDO0FBQ2xDLHdDQUFtQztBQUVuQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUxQixPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBbUIsRUFBRSxFQUFFO0lBQ3pDLENBQUM7O1lBQ0MsTUFBTSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3pCLE1BQU0sRUFBRSxHQUFJLElBQUksYUFBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEQsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3JELE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FBQSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFBO0FBRUQsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQW1CLEVBQUUsRUFBRTtJQUM1QyxDQUFDOztZQUNDLE1BQU0sRUFBRSxHQUFJLElBQUksYUFBSyxDQUFDLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDeEQsSUFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFFekMsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWTtZQUM5QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDdkMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUE7QUFHRCxtREFBbUQ7QUFDbkQsNkJBQTZCO0FBQzdCLEVBQUU7QUFDRixvRUFBb0U7QUFDcEUsNkNBQTZDO0FBQzdDLHdCQUF3QjtBQUN4Qiw4Q0FBOEM7QUFDOUMsSUFBSSJ9