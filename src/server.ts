import * as yargs from "yargs";
import * as path from 'path';
import * as fs from 'fs';
import * as _ from 'lodash';
import {VecDb} from "./VecDb";
import {NsmSimilarity} from "./NsmSimilarity";
import {AnnoySimilarity} from "./AnnoySimilarity";
import {WordvecQueryServiceServer} from "./WordvecQueryServiceServer";
import * as levelup from "levelup";
import leveldown from "leveldown";

(async function main() {
  const args = yargs.usage(`Usage: $0 -p port --nms host:port --data ./dir`)
          .option('port', {
            alias: 'p',
            describe: 'port to listen on'
          })
          .option ('nms', {
            describe: 'nms server host:port'
          })
          .option('annoy', {
            alias: 'a',
            describe: 'the annoy index file path, relative to data dir'
          })
          .option('searchk', {
            describe: 'the searchk parameter for annoy, larger = slower|more accurate.'  ,
            default: 10000
          })
          .option ('data', {
            describe: 'path to the data dir thats written by the index command'
          })
          .demandOption(['port', 'data'])
      //.help('help')     // --help for help
  ;
  const argv = args.argv;
  let leveldb = levelup(leveldown(path.resolve(argv.data, 'leveldb')));
  let vecDb;
  if (argv.nms) {
    let [host, port] = argv.nms.split(':');
    let nmsClient = new NsmSimilarity(host, parseInt(port));
    vecDb = new VecDb(leveldb, nmsClient);
  } else if (argv.annoy) {
    let match = _.find(fs.readdirSync(argv.data), (name:string) => {
      if (argv.annoy === true) {return /\.annoy$/i.test(name)}
      else {
        return /\.annoy$/i.test(name) && _.includes(name, argv.annoy);
      }
    });
    if (!match) throw new Error(`Unable to determine annoy index file`);
    console.log("Using index file " + match);
    let indexFile = path.resolve(argv.data, match);
    let annoyDb = AnnoySimilarity.loadAs(indexFile);
    annoyDb.setSearchK(argv.searchk);
    vecDb = new VecDb(leveldb, annoyDb);
  } else {
    throw new Error("Specify one of --nms or --annoy");
  }
  let server = new WordvecQueryServiceServer(vecDb);
  server.listen(parseInt(argv.port));
  console.log('listening ...');
  
})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
}) 

