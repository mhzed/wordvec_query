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
const async_iterate_stream_1 = require("async-iterate-stream");
const byline = require("byline");
const _ = require("lodash");
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
                            yield vecHook(word, wordvec, id);
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
exports.streamVecFile = streamVecFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtVmVjRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0cmVhbVZlY0ZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsK0RBQTBEO0FBQzFELGlDQUFpQztBQUNqQyw0QkFBNEI7QUFFNUIsdUJBQ0UsS0FBZSxFQUNmLE9BQW1FLEVBQ25FLEtBQXVEOztRQUN2RCxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFDLENBQUMsQ0FBQztRQUNwQixJQUFJLFNBQVMsR0FBRyxTQUFTLENBQUM7O1lBQzFCLEdBQUcsQ0FBQyxDQUFxQixJQUFBLEtBQUEsY0FBQSx5Q0FBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUEsSUFBQTtnQkFBdEQsTUFBTSxJQUFJLGlCQUFBLENBQUE7Z0JBQ25CLEtBQUssRUFBRSxDQUFDO2dCQUNSLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMvQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUUsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLElBQUUsQ0FBQyxDQUFDO29CQUFDLFFBQVEsQ0FBQyxDQUFFLGlFQUFpRTtnQkFDM0csSUFBSSxDQUFDO29CQUNILElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxPQUFPLEdBQWMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFRO3dCQUNwRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUUsR0FBRyxDQUFDOzRCQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7d0JBQUMsSUFBSTs0QkFBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNsRCxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUN0QyxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO3dCQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDO29CQUV2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNqQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtvQkFDL0IsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDO3dCQUN2QyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUE7b0JBQ3ZELENBQUM7b0JBQ0QsSUFBSSxDQUFDLENBQUM7d0JBQ0osRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDOzRCQUFDLE1BQU0sT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7d0JBQzlDLEVBQUUsRUFBRSxDQUFDLENBQUMscUNBQXFDO29CQUM3QyxDQUFDO2dCQUNILENBQUM7Z0JBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BGLENBQUM7YUFDRjs7Ozs7Ozs7OztJQUNILENBQUM7Q0FBQTtBQTlCRCxzQ0E4QkMifQ==