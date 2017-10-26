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
const async_iterate_stream_1 = require("async-iterate-stream");
const byline = require("byline");
const _ = require("lodash");
function vecSplit(src, labels, vectors) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (var _a = __asyncValues(async_iterate_stream_1.asyncIterateStream(byline(src), false)), _b; _b = yield _a.next(), !_b.done;) {
                const line = yield _b.value;
                let vec = line.toString().split(/\s+/);
                labels.write(vec[0] + "\n");
                vec = _.map(vec.slice(1), (n) => { if (n == '.')
                    return '0.0';
                else
                    return n; });
                vectors.write(vec.join(' ') + "\n");
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
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const args = yargs.usage(`Usage: $0 input_file`)
            .option('force', {
            alias: 'f',
            describe: 'override output files if exist'
        })
            .demandCommand(1);
        const argv = args.argv;
        const pathToFile = path.resolve(argv._[0]);
        if (!fs.existsSync(pathToFile))
            throw new Error(`Cant' find ${pathToFile}`);
        const labelFile = pathToFile + ".label";
        const vectorFile = pathToFile + ".vectors";
        if (fs.existsSync(labelFile) && !('force' in argv)) {
            throw new Error(`${labelFile} already exits. -f to override`);
        }
        let labelStream = fs.createWriteStream(labelFile);
        if (fs.existsSync(vectorFile) && !('force' in argv)) {
            throw new Error(`${vectorFile} already exits. -f to override`);
        }
        let vectorStream = fs.createWriteStream(vectorFile);
        yield vecSplit(fs.createReadStream(pathToFile), labelStream, vectorStream);
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
}).then(() => {
    process.exit(0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVjc3BsaXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZWNzcGxpdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQkFBK0I7QUFDL0IsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUV6QiwrREFBd0Q7QUFDeEQsaUNBQWlDO0FBQ2pDLDRCQUE0QjtBQUU1QixrQkFBeUIsR0FBYSxFQUFFLE1BQWdCLEVBQUUsT0FBaUI7OztZQUN6RSxHQUFHLENBQUMsQ0FBcUIsSUFBQSxLQUFBLGNBQUEseUNBQWtCLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFBLElBQUE7Z0JBQXBELE1BQU0sSUFBSSxpQkFBQSxDQUFBO2dCQUNuQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxDQUFDO29CQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQUMsSUFBSTtvQkFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQzs7Ozs7Ozs7OztJQUNILENBQUM7Q0FBQTtBQUNELENBQUM7O1FBQ0MsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQzthQUN2QyxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ2YsS0FBSyxFQUFFLEdBQUc7WUFDVixRQUFRLEVBQUUsZ0NBQWdDO1NBQzNDLENBQUM7YUFDRCxhQUFhLENBQUMsQ0FBQyxDQUFDLENBRXhCO1FBQ0QsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztRQUV2QixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUUxQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7WUFBQyxNQUFNLElBQUksS0FBSyxDQUFDLGNBQWMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUM1RSxNQUFNLFNBQVMsR0FBRyxVQUFVLEdBQUMsUUFBUSxDQUFDO1FBQ3RDLE1BQU0sVUFBVSxHQUFHLFVBQVUsR0FBQyxVQUFVLENBQUM7UUFFekMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsU0FBUyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2hFLENBQUM7UUFDRCxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsVUFBVSxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFDRCxJQUFJLFlBQVksR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEQsTUFBTSxRQUFRLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUU3RSxDQUFDO0NBQUEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRztJQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFBIn0=