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
const NsmSimilarity_1 = require("./NsmSimilarity");
const AnnoySimilarity_1 = require("./AnnoySimilarity");
const WordvecQueryServiceServer_1 = require("./WordvecQueryServiceServer");
const levelup = require("levelup");
const leveldown_1 = require("leveldown");
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = yargs.usage(`Usage: $0 -p port --nms host:port --data ./dir`)
            .option('port', {
            alias: 'p',
            describe: 'port to listen on'
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
        let leveldb = levelup(leveldown_1.default(path.resolve(argv.data, 'leveldb')));
        let vecDb;
        if (argv.nms) {
            let [host, port] = argv.nms.split(':');
            let nmsClient = new NsmSimilarity_1.NsmSimilarity(host, parseInt(port));
            vecDb = new VecDb_1.VecDb(leveldb, nmsClient);
        }
        else if (argv.annoy) {
            let match = _.find(fs.readdirSync(argv.data), (name) => {
                if (argv.annoy === true) {
                    return /\.annoy$/i.test(name);
                }
                else {
                    return /\.annoy$/i.test(name) && _.includes(name, argv.annoy);
                }
            });
            if (!match)
                throw new Error(`Unable to determine annoy index file`);
            console.log("Using index file " + match);
            let indexFile = path.resolve(argv.data, match);
            let annoyDb = AnnoySimilarity_1.AnnoySimilarity.loadAs(indexFile);
            annoyDb.setSearchK(argv.searchk);
            vecDb = new VecDb_1.VecDb(leveldb, annoyDb);
        }
        else {
            throw new Error("Specify one of --nms or --annoy");
        }
        let server = new WordvecQueryServiceServer_1.WordvecQueryServiceServer(vecDb);
        server.listen(parseInt(argv.port));
        console.log('listening ...');
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
}).then(() => {
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VydmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7QUFDNUIsbUNBQThCO0FBQzlCLG1EQUE4QztBQUM5Qyx1REFBa0Q7QUFDbEQsMkVBQXNFO0FBQ3RFLG1DQUFtQztBQUNuQyx5Q0FBa0M7QUFFbEMsQ0FBQzs7UUFDQyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGdEQUFnRCxDQUFDO2FBQ2pFLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZCxLQUFLLEVBQUUsR0FBRztZQUNWLFFBQVEsRUFBRSxtQkFBbUI7U0FDOUIsQ0FBQzthQUNELE1BQU0sQ0FBRSxLQUFLLEVBQUU7WUFDZCxRQUFRLEVBQUUsc0JBQXNCO1NBQ2pDLENBQUM7YUFDRCxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixRQUFRLEVBQUUsaURBQWlEO1NBQzVELENBQUM7YUFDRCxNQUFNLENBQUMsU0FBUyxFQUFFO1lBQ2pCLFFBQVEsRUFBRSxpRUFBaUU7WUFDM0UsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO2FBQ0QsTUFBTSxDQUFFLE1BQU0sRUFBRTtZQUNmLFFBQVEsRUFBRSx5REFBeUQ7U0FDcEUsQ0FBQzthQUNELFlBQVksQ0FBQyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUV0QztRQUNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDdkIsSUFBSSxPQUFPLEdBQUcsT0FBTyxDQUFDLG1CQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRSxJQUFJLEtBQUssQ0FBQztRQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN2QyxJQUFJLFNBQVMsR0FBRyxJQUFJLDZCQUFhLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDeEMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBVztnQkFDeEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUFBLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxDQUFDO29CQUNKLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEUsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDekMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQy9DLElBQUksT0FBTyxHQUFHLGlDQUFlLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLEtBQUssR0FBRyxJQUFJLGFBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHFEQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7SUFFL0IsQ0FBQztDQUFBLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUc7SUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ1IsQ0FBQyxDQUFDLENBQUEifQ==