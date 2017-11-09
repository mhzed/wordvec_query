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
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = yargs.usage(`Usage: $0 -p port --nms host:port --data ./dir`)
            .option('port', {
            alias: 'p',
            describe: 'port to listen on'
        })
            .option('express', {
            describe: 'listen using express as http server, default is thrift server'
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
            if (argv.static) {
                const [urlpath, filepath] = argv.static.split(':');
                app.use(urlpath, express.static(path.resolve(filepath)));
            }
            bindToExpress_1.bindToExpress(app, '/thrift', vecDb);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7QUFDNUIsbUNBQThCO0FBQzlCLGlEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsNkVBQXdFO0FBQ3hFLDZFQUF3RTtBQUN4RSxtQ0FBbUM7QUFDbkMsbURBQThDO0FBQzlDLG1DQUFtQztBQUNuQyx5Q0FBa0M7QUFFckIsUUFBQSxtQkFBbUIsR0FBRyxDQUFDLE9BQWUsRUFBRSxPQUFlO0lBRWxFLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQVk7UUFDakYsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFFO0lBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDSixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDakMsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLG1CQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLElBQUksS0FBSyxHQUFHLCtCQUFjLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sQ0FBQztRQUNMLEtBQUssRUFBRSxJQUFJLGFBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDO1FBQ2hDLFNBQVM7UUFDVCxLQUFLO0tBQ04sQ0FBQztBQUNKLENBQUMs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