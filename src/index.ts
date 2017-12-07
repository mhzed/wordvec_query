import * as yargs from "yargs";
import * as path from 'path';
import * as fs from 'fs';
import * as fse from "fs-extra";
import {VecDb} from "./VecDb";
import * as levelup from "levelup";
import leveldown from "leveldown";
import {AnnoyNeighbors} from "./AnnoyNeighbors";

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
            describe: 'create annoy index (leveldb must be created first)'
          })
          .option ('trees', {
            alias: 't',
            describe: 'tree size for annoy index, default is 0 (auto determined).'
          })
          .option('out', {
            alias: 'o',
            describe: 'the output dir, default is the parent dir of input_file'
          })
          .option('method', {
            describe: "index method, one of Angular|Euclidean"
          })
          .epilog(`
For annoy index creation time for 400k 300d vectors:  
  - 90s when trees is 10
  - 200s when trees is 50
  - 640s when trees is 200
Though annoy's doc says larger tree => more accurate result, experiment shows otherwise: size 50-100 seems optimal for the case above. 
  
          `)
          .demandCommand(1)
      //.help('help')     // --help for help
  ;
  const argv = args.argv;
  const pathToFile = path.resolve(argv._[0])
  
  if (!fs.existsSync(pathToFile)) throw new Error(`Cant' find ${pathToFile}`);
  const dbPath = path.resolve(path.dirname(pathToFile), "leveldb");
  const vectorFile = pathToFile+".vectors";
  const labelFile = pathToFile+".label";
  
  if (argv.level) {
    if (fs.existsSync(dbPath)) {
      if (!(argv.force)) throw new Error(`${dbPath} already exits. -f to override`);
      else fse.removeSync(dbPath);
    }
    if (fs.existsSync(vectorFile) && !(argv.force)) {
      throw new Error(`${vectorFile} already exits. -f to override`);
    }

    let vectorStream = fs.createWriteStream(vectorFile);
    let labelStream = fs.createWriteStream(labelFile);
    const vecDb = new VecDb(levelup(leveldown(dbPath)), null);
    console.log("Creating leveldb ....");
    await vecDb.ingestDb(fs.createReadStream(pathToFile), (word, vec) =>{
      labelStream.write(word + "\n");
      vectorStream.write(vec.join(' ') + "\n");
    });
    vectorStream.close();
  }

  if (argv.annoy) {
    console.log("Creating annoy index....");
    let property = {
      method: argv.method ? argv.method : "angular",
      ntrees: argv.trees ? parseInt(argv.trees) : 0
    }
    let annoySim = await AnnoyNeighbors.buildIndexFromVector(fs.createReadStream(vectorFile), property);
    annoySim.saveAs(pathToFile);
  }

})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
  process.exit(0);
}) 

