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
const nmsClient = VecDb_1.VecDb.createNmsClient('localhost', 10000);
const fse = pmfy(fsextra);
exports.createdb = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fse.remove(dbPath);
            const db = new VecDb_1.VecDb(levelup(leveldown_1.default(dbPath)), nmsClient);
            yield db.ingestDb(fs.createReadStream(testDataFile));
            yield db.close();
        });
    })().catch(test.ifError).then(test.done);
};
exports.findVec = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new VecDb_1.VecDb(levelup(leveldown_1.default(dbPath)), nmsClient);
            let vec = yield db.findVec('was');
            test.equals(vec.length, 300, "300 long");
            let word = yield db.findWord(10); // 11th line
            test.equals(word, 'for', 'found word');
            yield db.close();
        });
    })().catch(test.ifError).then(test.done);
};
exports.findNearest = (test) => {
    (function body() {
        return __awaiter(this, void 0, void 0, function* () {
            const db = new VecDb_1.VecDb(levelup(leveldown_1.default(dbPath)), nmsClient);
            yield db.findNearestVectors('as', 10);
            yield db.close();
        });
    })().catch(test.ifError).then(test.done);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdHdvcmR2ZWNxdWVyeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3R3b3JkdmVjcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUVBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsb0NBQW9DO0FBQ3BDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IseUNBQWtDO0FBQ2xDLHdDQUFtQztBQUVuQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZFLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzdDLE1BQU0sU0FBUyxHQUFHLGFBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzVELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUUxQixPQUFPLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBbUI7SUFDckMsQ0FBQzs7WUFDQyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsTUFBTSxFQUFFLEdBQUksSUFBSSxhQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM3RCxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDckQsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUE7QUFFRCxPQUFPLENBQUMsT0FBTyxHQUFHLENBQUMsSUFBbUI7SUFDcEMsQ0FBQzs7WUFDQyxNQUFNLEVBQUUsR0FBSSxJQUFJLGFBQUssQ0FBQyxPQUFPLENBQUMsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzdELElBQUksR0FBRyxHQUFHLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBRXpDLElBQUksSUFBSSxHQUFHLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVk7WUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25CLENBQUM7S0FBQSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsQ0FBQyxDQUFBO0FBR0QsT0FBTyxDQUFDLFdBQVcsR0FBRyxDQUFDLElBQW1CO0lBQ3hDLENBQUM7O1lBRUMsTUFBTSxFQUFFLEdBQUksSUFBSSxhQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztZQUM3RCxNQUFNLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDdEMsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsQ0FBQztLQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxDQUFDLENBQUEifQ==