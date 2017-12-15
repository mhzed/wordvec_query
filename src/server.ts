import * as yargs from "yargs";
import * as path from 'path';
import * as fs from 'fs';
import * as URL from 'url';
import * as _ from 'lodash';
import {VecDb} from "./VecDb";
import {NsmNeighbors} from "./NsmNeighbors";
import {AnnoyNeighbors} from "./AnnoyNeighbors";
import {WordvecQueryServiceHandler} from "./WordvecQueryServiceHandler";
import {WordvecQueryServiceFactory} from "./WordvecQueryServiceFactory";
import * as express from 'express';
import {bindToExpress} from "./bindToExpress";
import * as levelup from "levelup";
import leveldown from "leveldown";
import * as proxy from 'express-http-proxy';


export const loadVecDbUsignAnnoy = (dataDir: string, pattern: string) 
    : {vecdb: VecDb, indexFile: string, annoy: AnnoyNeighbors} => {
  let indexFile = path.resolve(dataDir, _.find(fs.readdirSync(dataDir), (name: string) => { 
    return /\.annoy$/i.test(name) && (!pattern || _.includes(name, pattern)) ;
  }));
  if (!indexFile) return undefined; 
  let leveldb = levelup(leveldown(path.resolve(dataDir, 'leveldb')));
  let annoy = AnnoyNeighbors.loadAs(indexFile);
  return {
    vecdb: new VecDb(leveldb, annoy),
    indexFile,
    annoy
  };
};

const installProxy = (app: any, hostport: string, thisport: string) : void => {
  app.use('/', proxy(hostport, {
    parseReqBody: false,
    proxyReqPathResolver: (req)=> { // no change
      return URL.parse(req.url).path;
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
      //  no change
      return proxyResData;
    }
  }));
};

(async function main() {
  const args = yargs.usage(`Usage: $0 -p port --nms host:port --data ./dir`)
          .option('port', {
            alias: 'p',
            describe: 'port to listen on'
          })
          .option('express', {
            alias: 'e',
            describe: 'listen using express as http server, default is thrift server'
          })
          .option('proxy', {
            alias: 'x',
            describe: 'setup proxy to map / to http://host:port/, allows CORS'
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
  let vecDb;
  if (argv.nms) {
    let [host, port] = argv.nms.split(':');
    let nmsClient = new NsmNeighbors(host, parseInt(port));
    let leveldb = levelup(leveldown(path.resolve(argv.data, 'leveldb')));
    vecDb = new VecDb(leveldb, nmsClient);
  } else if (argv.annoy) {
    let ret = loadVecDbUsignAnnoy(argv.data, typeof argv.annoy == 'string' ? argv.annoy : null);
    if (!ret) throw new Error(`Unable to determine annoy index file`);
    console.log("Using index file " + ret.indexFile);
    ret.annoy.setSearchK(argv.searchk);
    vecDb = ret.vecdb;
  } else {
    throw new Error("Specify one of --nms or --annoy");
  }

  if (argv.express) {
    const app = express();
    // support CORS
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      if ('OPTIONS' == req.method) {
        res.sendStatus(200);
      }
      else {
        next();
      }
    });
    bindToExpress(app, '/thrift', vecDb);
    if (argv.proxyxplore) {
      installProxy(app, argv.proxyxplore, argv.port);
    }
    app.listen(parseInt(argv.port));
    console.log(`http server listening at http://localhost:${argv.port}/thrift ...`);
  } else {
    let server = WordvecQueryServiceFactory.createServer(new WordvecQueryServiceHandler(vecDb));
    server.listen(parseInt(argv.port));
    console.log(`thrift server listening on ${argv.port}...`);
  }  
})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
}); 

