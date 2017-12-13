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
const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const URL = require("url");
const _ = require("lodash");
const VecDb_1 = require("./VecDb");
const NsmNeighbors_1 = require("./NsmNeighbors");
const AnnoyNeighbors_1 = require("./AnnoyNeighbors");
const WordvecQueryServiceHandler_1 = require("./WordvecQueryServiceHandler");
const WordvecQueryServiceFactory_1 = require("./WordvecQueryServiceFactory");
const express = require("express");
const bindToExpress_1 = require("./bindToExpress");
const levelup = require("levelup");
const leveldown_1 = require("leveldown");
const proxy = require("express-http-proxy");
exports.loadVecDbUsignAnnoy = (dataDir, pattern) => {
    let indexFile = path.resolve(dataDir, _.find(fs.readdirSync(dataDir), (name) => {
        return /\.annoy$/i.test(name) && (!pattern || _.includes(name, pattern));
    }));
    if (!indexFile)
        return undefined;
    let leveldb = levelup(leveldown_1.default(path.resolve(dataDir, 'leveldb')));
    let annoy = AnnoyNeighbors_1.AnnoyNeighbors.loadAs(indexFile);
    return {
        vecdb: new VecDb_1.VecDb(leveldb, annoy),
        indexFile,
        annoy
    };
};
const installXploreProxy = (app, hostport, thisport) => {
    app.use('/', proxy(hostport, {
        parseReqBody: false,
        proxyReqPathResolver: (req) => {
            return URL.parse(req.url).path;
        },
        userResDecorator: function (proxyRes, proxyResData, userReq, userRes) {
            //  no change
            return proxyResData;
        }
    }));
};
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = yargs.usage(`Usage: $0 -p port --nms host:port --data ./dir`)
            .option('port', {
            alias: 'p',
            describe: 'port to listen on'
        })
            .option('express', {
            alias: 'e',
            describe: 'listen using express as http server, default is thrift server'
        })
            .option('proxyxplore', {
            alias: 'x',
            describe: 'setup proxy map to xplore at host:port'
        })
            .option('nms', {
            describe: 'nms server host:port'
        })
            .option('annoy', {
            alias: 'a',
            describe: 'the annoy index file path, relative to data dir'
        })
            .option('searchk', {
            describe: 'the searchk parameter for annoy, larger = slower|more accurate.',
            default: 10000
        })
            .option('data', {
            describe: 'path to the data dir thats written by the index command'
        })
            .demandOption(['port', 'data']);
        const argv = args.argv;
        let vecDb;
        if (argv.nms) {
            let [host, port] = argv.nms.split(':');
            let nmsClient = new NsmNeighbors_1.NsmNeighbors(host, parseInt(port));
            let leveldb = levelup(leveldown_1.default(path.resolve(argv.data, 'leveldb')));
            vecDb = new VecDb_1.VecDb(leveldb, nmsClient);
        }
        else if (argv.annoy) {
            let ret = exports.loadVecDbUsignAnnoy(argv.data, typeof argv.annoy == 'string' ? argv.annoy : null);
            if (!ret)
                throw new Error(`Unable to determine annoy index file`);
            console.log("Using index file " + ret.indexFile);
            ret.annoy.setSearchK(argv.searchk);
            vecDb = ret.vecdb;
        }
        else {
            throw new Error("Specify one of --nms or --annoy");
        }
        if (argv.express) {
            const app = express();
            // support CORS
            app.use(function (req, res, next) {
                res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
                if ('OPTIONS' == req.method) {
                    res.sendStatus(200);
                }
                else {
                    next();
                }
            });
            bindToExpress_1.bindToExpress(app, '/thrift', vecDb);
            if (argv.proxyxplore) {
                installXploreProxy(app, argv.proxyxplore, argv.port);
            }
            app.listen(parseInt(argv.port));
            console.log(`http server listening at http://localhost:${argv.port}/thrift ...`);
        }
        else {
            let server = WordvecQueryServiceFactory_1.WordvecQueryServiceFactory.createServer(new WordvecQueryServiceHandler_1.WordvecQueryServiceHandler(vecDb));
            server.listen(parseInt(argv.port));
            console.log(`thrift server listening on ${argv.port}...`);
        }
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
}).then(() => {
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QiwyQkFBMkI7QUFDM0IsNEJBQTRCO0FBQzVCLG1DQUE4QjtBQUM5QixpREFBNEM7QUFDNUMscURBQWdEO0FBQ2hELDZFQUF3RTtBQUN4RSw2RUFBd0U7QUFDeEUsbUNBQW1DO0FBQ25DLG1EQUE4QztBQUM5QyxtQ0FBbUM7QUFDbkMseUNBQWtDO0FBQ2xDLDRDQUE0QztBQUcvQixRQUFBLG1CQUFtQixHQUFHLENBQUMsT0FBZSxFQUFFLE9BQWUsRUFDTCxFQUFFO0lBQy9ELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFO1FBQ3JGLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBRTtJQUM1RSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ0osRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBQ2pDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxtQkFBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxJQUFJLEtBQUssR0FBRywrQkFBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUM7UUFDTCxLQUFLLEVBQUUsSUFBSSxhQUFLLENBQUMsT0FBTyxFQUFFLEtBQUss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