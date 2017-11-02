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
const AnnoySimilarity_1 = require("./AnnoySimilarity");
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
            describe: 'create annoy index (leveldb must be created first)'
        })
            .option('trees', {
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
Though annoy's doc says larger tree => more accurate result, experiment shows otherwise: for 400k vectors, size 50-100
is optimal. 
  
          `)
            .demandCommand(1);
        const argv = args.argv;
        const pathToFile = path.resolve(argv._[0]);
        if (!fs.existsSync(pathToFile))
            throw new Error(`Cant' find ${pathToFile}`);
        const dbPath = path.resolve(path.dirname(pathToFile), "leveldb");
        const vectorFile = pathToFile + ".vectors";
        const labelFile = pathToFile + ".label";
        if (argv.level) {
            if (fs.existsSync(dbPath)) {
                if (!(argv.force))
                    throw new Error(`${dbPath} already exits. -f to override`);
                else
                    fse.removeSync(dbPath);
            }
            if (fs.existsSync(vectorFile) && !(argv.force)) {
                throw new Error(`${vectorFile} already exits. -f to override`);
            }
            let vectorStream = fs.createWriteStream(vectorFile);
            let labelStream = fs.createWriteStream(labelFile);
            const vecDb = new VecDb_1.VecDb(levelup(leveldown_1.default(dbPath)), null);
            console.log("Creating leveldb ....");
            yield vecDb.ingestDb(fs.createReadStream(pathToFile), (word, vec) => {
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
            };
            let annoySim = yield AnnoySimilarity_1.AnnoySimilarity.buildIndexFromVector(fs.createReadStream(vectorFile), property);
            annoySim.saveAs(pathToFile);
        }
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
}).then(() => {
    process.exit(0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0JBQStCO0FBQy9CLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIsZ0NBQWdDO0FBS2hDLG1DQUE4QjtBQUM5QixtQ0FBbUM7QUFDbkMseUNBQWtDO0FBQ2xDLHVEQUFrRDtBQUVsRDs7Ozs7R0FLRztBQUNILENBQUM7O1FBQ0MsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzthQUN2QyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixRQUFRLEVBQUUsZ0NBQWdDO1NBQzNDLENBQUM7YUFDRCxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixRQUFRLEVBQUUsZ0JBQWdCO1NBQzNCLENBQUM7YUFDRCxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixRQUFRLEVBQUUsb0RBQW9EO1NBQy9ELENBQUM7YUFDRCxNQUFNLENBQUUsT0FBTyxFQUFFO1lBQ2hCLEtBQUssRUFBRSxHQUFHO1lBQ1YsUUFBUSxFQUFFLDREQUE0RDtTQUN2RSxDQUFDO2FBQ0QsTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNiLEtBQUssRUFBRSxHQUFHO1lBQ1YsUUFBUSxFQUFFLHlEQUF5RDtTQUNwRSxDQUFDO2FBQ0QsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUNoQixRQUFRLEVBQUUsd0NBQXdDO1NBQ25ELENBQUM7YUFDRCxNQUFNLENBQUM7Ozs7Ozs7O1dBUVAsQ0FBQzthQUNELGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FFeEI7UUFDRCxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxD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