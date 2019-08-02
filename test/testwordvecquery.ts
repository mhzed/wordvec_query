
import * as nodeunit from 'nodeunit';
import * as path from 'path';
import * as fs from 'fs';
import * as fsextra from 'fs-extra';
import * as levelup from "levelup";
import * as pmfy from "pmfy";
import leveldown from "leveldown";
import {VecDb} from "../src/VecDb";
import { streamVecFile } from "../src/streamVecFile";

const testDataFile = path.resolve(__dirname, 'glove.6B.300d.100l.txt');
const dbPath = path.resolve(__dirname, 'db');
const fse = pmfy(fsextra);

exports.createdb = (test: nodeunit.Test) => {
  (async function body() {
    await fse.remove(dbPath);
    const db  = new VecDb(levelup(leveldown(dbPath)), null);
    await streamVecFile(fs.createReadStream(testDataFile), async (word, vec, id)=>{
      await db.store(word, vec, id);
    }, ()=>{})
    await db.close();
  })().catch(test.ifError).then(test.done);
}

exports.testleveldb = (test: nodeunit.Test) => {
  (async function body() {
    const db  = new VecDb(levelup(leveldown(dbPath)), null);
    let vec = await db.findVec('was');
    test.equals(vec.length, 300, "300 long");
    
    let word = await db.findWord(10); // 11th line
    test.equals(word, 'for', 'found word');
    await db.close();
  })().catch(test.ifError).then(test.done);
}


// exports.findNearest = (test: nodeunit.Test) => {
//   (async function body() {
//
//     const db  = new VecDb(levelup(leveldown(dbPath)), nmsClient);
//     await db.findNearestVectors('as', 10);
//     await db.close();
//   })().catch(test.ifError).then(test.done);
// }
