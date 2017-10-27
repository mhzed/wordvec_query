import * as yargs from "yargs";
import * as path from 'path';
import * as fs from 'fs';
import * as fse from "fs-extra";
import {Readable, Writable} from 'stream';
import {asyncIterateStream} from "async-iterate-stream";
import * as byline from 'byline';
import * as _ from 'lodash';
import {VecDb} from "./VecDb";
import * as levelup from "levelup";
import leveldown from "leveldown";

(async function main() {
  const args = yargs.usage(`Usage: $0 input_file`)
          .option('force', {
            alias: 'f',
            describe: 'override output files if exist'
          })
          .demandCommand(1)
      //.help('help')     // --help for help
  ;
  const argv = args.argv;

  const pathToFile = path.resolve(argv._[0])
  
  if (!fs.existsSync(pathToFile)) throw new Error(`Cant' find ${pathToFile}`);
  const dbPath = path.resolve(path.dirname(pathToFile), "leveldb");
  const vectorFile = pathToFile+".vectors";
  
  if (fs.existsSync(dbPath)) {
    if (!('force' in argv)) throw new Error(`${dbPath} already exits. -f to override`);
    else fse.removeSync(dbPath);
  }
  if (fs.existsSync(vectorFile)&&!('force' in argv)) {
    throw new Error(`${vectorFile} already exits. -f to override`);
  }
  let vectorStream = fs.createWriteStream(vectorFile);

  const vecDb  = new VecDb(levelup(leveldown(dbPath)), null);
  await vecDb.ingestDb(fs.createReadStream(pathToFile), vectorStream);
  
})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
  process.exit(0);
}) 

