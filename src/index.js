"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncIterator) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");
const VecDb_1 = require("./VecDb");
const levelup = require("levelup");
const leveldown_1 = require("leveldown");
const AnnoyNeighbors_1 = require("./AnnoyNeighbors");
const async_iterate_stream_1 = require("async-iterate-stream");
const byline = require("byline");
const _ = require("lodash");
/**
 * command line to take a wordvec dump and then:
 * 1. create leveldb lookup for words and vectors
 * 2. create a vector only text file for nmslib to index
 *
 */
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
            .option('trees', {
            alias: 't',
            describe: 'tree size for annoy index, default is 0 (auto determined).'
        })
            .option('out', {
            alias: 'o',
            describe: 'the output dir, default is the parent dir of input_file or . if omitted'
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
  
          `);
        const argv = args.argv;
        let instream;
        let outdir;
        let outname;
        if (!argv._[0]) {
            outdir = path.resolve('.');
            outname = 'vec';
            instream = process.stdin;
            console.log("Waiting for stdin");
        }
        else {
            let f = path.resolve(argv._[0]);
            if (!fs.existsSync(f))
                throw new Error(`Cant' find ${f}`);
            outdir = path.dirname(f);
            outname = path.basename(f);
            instream = fs.createReadStream(f);
        }
        if (argv.out) {
            outdir = path.resolve(argv.out);
        }
        let vecDb, annoy;
        if (argv.level) {
            const dbPath = path.resolve(outdir, "leveldb");
            if (fs.existsSync(dbPath)) {
                if (!(argv.force))
                    throw new Error(`${dbPath} already exits. -f to override`);
                else
                    fse.removeSync(dbPath);
            }
            vecDb = new VecDb_1.VecDb(levelup(leveldown_1.default(dbPath)), null);
            console.log("Creating leveldb ....");
        }
        if (argv.annoy) {
            let property = {
                method: argv.method ? argv.method : "angular",
                ntrees: argv.trees ? parseInt(argv.trees) : 0
            };
            console.log("Creating annoy index ....");
            annoy = new AnnoyNeighbors_1.AnnoyNeighbors(property);
        }
        yield streamVecFile(instream, (word, vec, id) => {
            if (vecDb)
                vecDb.store(word, vec, id);
            if (annoy) {
                if (id == 0) {
                    annoy.createIndex(vec.length);
                }
                annoy.addItemToIndex(id, vec);
            }
        }, (iline, line, msg) => {
            console.log(`Ignoring line ${iline} error ${msg}`);
        });
        if (annoy) {
            console.log("Saving annoy index....");
            annoy.buildIndex();
            annoy.saveAs(path.join(outdir, outname));
        }
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
}).then(() => {
    process.exit(0);
});
function streamVecFile(input, vecHook, errCb) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = 0, iline = 0;
        let dimension = undefined;
        try {
            for (var _a = __asyncValues(async_iterate_stream_1.asyncIterateStream(byline(input), false)), _b; _b = yield _a.next(), !_b.done;) {
                const line = yield _b.value;
                iline++;
                let vec = _.trim(line.toString()).split(/\s+/);
                if (iline == 1 && vec.length == 2)
                    continue; // fasttext dump: first line is line count and dimensions, ignore
                try {
                    let word = vec[0];
                    let wordvec = _(vec.slice(1)).map((n) => {
                        if (n == '.')
                            return 0;
                        else
                            return parseFloat(n);
                    }).filter((e) => _.isFinite(e)).value();
                    if (dimension == undefined)
                        dimension = wordvec.length;
                    if (word === null || word === '') {
                        errCb(iline, line, "no word");
                    }
                    else if (wordvec.length != dimension) {
                        errCb(iline, line, "bad dimension " + wordvec.length);
                    }
                    else {
                        if (vecHook)
                            vecHook(word, wordvec, id);
                        id++; // id keesp track of valid lines only
                    }
                }
                catch (e) {
                    throw new Error("Line " + iline + ": " + line + "\n" + (e.stack || e.toString()));
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) yield _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QixnQ0FBZ0M7QUFDaEMsbUNBQThCO0FBQzlCLG1DQUFtQztBQUNuQyx5Q0FBa0M7QUFDbEMscURBQWdEO0FBQ2hELCtEQUF3RDtBQUV4RCxpQ0FBaUM7QUFDakMsNEJBQTRCO0FBRTVCOzs7OztHQUtHO0FBQ0gsQ0FBQzs7UUFDQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO2FBQ3ZDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDZixLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSxnQ0FBZ0M7U0FDM0MsQ0FBQzthQUNELE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDZixLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSxnQkFBZ0I7U0FDM0IsQ0FBQzthQUNELE1BQU0sQ0FBQyxPQUFPLEVBQUU7WUFDZixLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSxvQkFBb0I7U0FDL0IsQ0FBQzthQUNELE1BQU0sQ0FBRSxPQUFPLEVBQUU7WUFDaEIsS0FBSyxFQUFFLEdBQUc7WUFDVixRQUFRLEVBQUUsNERBQTREO1NBQ3ZFLENBQUM7YUFDRCxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2IsS0FBSyxFQUFFLEdBQUc7WUFDVixRQUFRLEVBQUUseUVBQXlFO1NBQ3BGLENBQUM7YUFDRCxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ2hCLFFBQVEsRUFBRSx3Q0FBd0M7U0FDbkQsQ0FBQzthQUNELE1BQU0sQ0FBQzs7Ozs7OztXQU9QLENBQUMsQ0FFVDtRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxRQUFRLENBQUM7UUFDYixJQUFJLE1BQU0sQ0FBQztRQUNY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