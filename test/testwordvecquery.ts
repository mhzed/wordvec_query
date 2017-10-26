
import * as nodeunit from 'nodeunit';
import * as path from 'path';
import * as fs from 'fs';
import * as fsextra from 'fs-extra';
import * as levelup from "levelup";
import * as pmfy from "pmfy";
import leveldown from "leveldown";
import {VecDb} from "../src/VecDb";

const testDataFile = path.resolve(__dirname, 'glove.6B.300d.100l.txt');
const dbPath = path.resolve(__dirname, 'db');
const nmsClient = VecDb.createNmsClient('localhost', 10000);
const fse = pmfy(fsextra);

exports.createdb = (test: nodeunit.Test) => {
  (async function body() {
    await fse.remove(dbPath);
    const db  = new VecDb(levelup(leveldown(dbPath)), nmsClient);
    await db.ingestDb(fs.createReadStream(testDataFile));
    await db.close();
  })().catch(test.ifError).then(test.done);
}

exports.findVec = (test: nodeunit.Test) => {
  (async function body() {
    const db  = new VecDb(levelup(leveldown(dbPath)), nmsClient);
    let vec = await db.findVec('was');
    test.equals(vec.length, 300, "300 long");
    
    let word = await db.findWord(10); // 11th line
    test.equals(word, 'for', 'found word');
    await db.close();
  })().catch(test.ifError).then(test.done);
}


exports.findNearest = (test: nodeunit.Test) => {
  (async function body() {

    const db  = new VecDb(levelup(leveldown(dbPath)), nmsClient);
    await db.findNearestVectors('as', 10);
    await db.close();
  })().catch(test.ifError).then(test.done);
}
