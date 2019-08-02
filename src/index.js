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
const fse = require("fs-extra");
const VecDb_1 = require("./VecDb");
const levelup = require("levelup");
const leveldown_1 = require("leveldown");
const AnnoyNeighbors_1 = require("./AnnoyNeighbors");
const streamVecFile_1 = require("./streamVecFile");
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
        yield streamVecFile_1.streamVecFile(instream, (word, vec, id) => __awaiter(this, void 0, void 0, function* () {
            if (vecDb)
                yield vecDb.store(word, vec, id);
            if (annoy) {
                if (id == 0) {
                    annoy.createIndex(vec.length);
                }
                annoy.addItemToIndex(id, vec);
            }
        }), (iline, line, msg) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsZ0NBQWdDO0FBQ2hDLG1DQUE4QjtBQUM5QixtQ0FBbUM7QUFDbkMseUNBQWtDO0FBQ2xDLHFEQUFnRDtBQUVoRCxtREFBZ0Q7QUFFaEQ7Ozs7O0dBS0c7QUFDSCxDQUFDOztRQUNDLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7YUFDdkMsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNmLEtBQUssRUFBRSxHQUFHO1lBQ1YsUUFBUSxFQUFFLGdDQUFnQztTQUMzQyxDQUFDO2FBQ0QsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNmLEtBQUssRUFBRSxHQUFHO1lBQ1YsUUFBUSxFQUFFLGdCQUFnQjtTQUMzQixDQUFDO2FBQ0QsTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNmLEtBQUssRUFBRSxHQUFHO1lBQ1YsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQixDQUFDO2FBQ0QsTUFBTSxDQUFFLE9BQU8sRUFBRTtZQUNoQixLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSw0REFBNEQ7U0FDdkUsQ0FBQzthQUNELE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDYixLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSwwRUFBMEU7U0FDckYsQ0FBQzthQUNELE1BQU0sQ0FBQyxRQUFRLEVBQUU7WUFDaEIsUUFBUSxFQUFFLHdDQUF3QztTQUNuRCxDQUFDO2FBQ0QsTUFBTSxDQUFDOzs7Ozs7O1dBT1AsQ0FBQyxDQUVUO1FBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLFFBQVEsQ0FBQztRQUNiLElBQUksTUFBTSxDQUFDO1FBQ1gsSUFBSSxPQUFPLENBQUM7UUFFWixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDM0IsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUNELElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFELE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLFFBQVEsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFFRCxJQUFJLEtBQUssRUFBRSxLQUFxQixDQUFDO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDL0MsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLE1BQU0sZ0NBQWdDLENBQUMsQ0FBQztnQkFDOUUsSUFBSTtvQkFBQyxHQUFHLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLENBQUM7WUFDRCxLQUFLLEdBQUcsSUFBSSxhQUFLLENBQUMsT0FBTyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxRQUFRLEdBQUc7Z0JBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQzdDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzlDLENBQUE7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDekMsS0FBSyxHQUFHLElBQUksK0JBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxDQUFDO1FBRUQsTUFBTSw2QkFBYSxDQUFDLFFBQVEsRUFDMUIsQ0FBTyxJQUFZLEVBQUUsR0FBYSxFQUFFLEVBQVUsRUFBaUIsRUFBRTtZQUMvRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsTUFBTSxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDVixFQUFFLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWixLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEMsQ0FBQztnQkFDRCxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNoQyxDQUFDO1FBQ0gsQ0FBQyxDQUFBLEVBQ0QsQ0FBQyxLQUFhLEVBQUUsSUFBWSxFQUFFLEdBQVcsRUFBQyxFQUFFO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEtBQUssVUFBVSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FDRixDQUFBO1FBRUQsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUN0QyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbkIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNDLENBQUM7SUFFSCxDQUFDO0NBQUEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFDLEVBQUU7SUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFFLEVBQUU7SUFDVixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFBIn0=