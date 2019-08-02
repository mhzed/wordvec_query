import * as yargs from "yargs";
import * as path from 'path';
import * as fs from 'fs';
import * as fse from "fs-extra";
import {VecDb} from "./VecDb";
import * as levelup from "levelup";
import leveldown from "leveldown";
import {AnnoyNeighbors} from "./AnnoyNeighbors";
import {asyncIterateStream} from "async-iterate-stream";
import { streamVecFile } from "./streamVecFile";

/**
 * command line to take a wordvec dump and then:
 * 1. create leveldb lookup for words and vectors
 * 2. create a vector only text file for nmslib to index
 * 
 */
(async function main() {
  const args = yargs.usage(`Usage: $0 input_file`)
          .option('force', {
            alias: 'f',
            describe: 'override output files if exist'
          })
          .option('level', {
            alias: 'l',
            describe: 'create leveldb'
          })
          .option('annoy', {
            alias: 'a',
            describe: 'create annoy index'
          })
          .option ('trees', {
            alias: 't',
            describe: 'tree size for annoy index, default is 0 (auto determined).'
          })
          .option('out', {
            alias: 'o',
            describe: 'the output dir, default is the parent dir of input_file or ./ if omitted'
          })
          .option('method', {
            describe: "index method, one of Angular|Euclidean"
          })
          .epilog(`
omitting input_file means read fron stdin
For annoy index creation time for 400k 300d vectors:  
  - 90s when trees is 10
  - 200s when trees is 50
  - 640s when trees is 200
  
          `)
      //.help('help')     // --help for help
  ;
  const argv = args.argv;
  let instream;
  let outdir;
  let outname;
  
  if (!argv._[0]) { // file not specified
    outdir = path.resolve('.');
    outname = 'vec';
    instream = process.stdin;
    console.log("Waiting for stdin");
  }
  else {
    let f = path.resolve(argv._[0]);
    if (!fs.existsSync(f)) throw new Error(`Cant' find ${f}`);
    outdir = path.dirname(f);
    outname = path.basename(f);
    instream = fs.createReadStream(f);
  }
  if (argv.out) {
    outdir = path.resolve(argv.out);
  }

  let vecDb, annoy: AnnoyNeighbors;
  if (argv.level) {
    const dbPath = path.resolve(outdir, "leveldb");
    if (fs.existsSync(dbPath)) {
      if (!(argv.force)) throw new Error(`${dbPath} already exits. -f to override`);
      else fse.removeSync(dbPath);
    }
    vecDb = new VecDb(levelup(leveldown(dbPath)), null);
    console.log("Creating leveldb ....");
  }
  if (argv.annoy) {
    let property = {
      method: argv.method ? argv.method : "angular",
      ntrees: argv.trees ? parseInt(argv.trees) : 0
    }
    console.log("Creating annoy index ....");
    annoy = new AnnoyNeighbors(property);
  }

  await streamVecFile(instream, 
    async (word: string, vec: number[], id: number): Promise<void> => {
      if (vecDb) await vecDb.store(word, vec, id);
      if (annoy) {
        if (id == 0) {
          annoy.createIndex(vec.length);
        }
        annoy.addItemToIndex(id, vec);
      }
    },
    (iline: number, line: string, msg: string)=>{
      console.log(`Ignoring line ${iline} error ${msg}`);
    }
  )

  if (annoy) {
    console.log("Saving annoy index....");
    annoy.buildIndex();
    annoy.saveAs(path.join(outdir, outname));
  }

})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
  process.exit(0);
}) 


