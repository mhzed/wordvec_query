import { Readable } from "stream";
import { asyncIterateStream } from "async-iterate-stream";
import * as byline from 'byline';
import * as _ from "lodash";

export async function streamVecFile(
  input: Readable, 
  vecHook: (word: string, vec: number[], id: number) => Promise<void>,
  errCb: (iline: number, line: string, msg: string)=>void ) : Promise<void> {
  let id = 0, iline=0;
  let dimension = undefined;
  for await (const line of asyncIterateStream(byline(input), false)) {
    iline++;
    let vec = _.trim(line.toString()).split(/\s+/);
    if (iline==1 && vec.length==2) continue;  // fasttext dump: first line is line count and dimensions, ignore
    try {
      let word = vec[0];
      let wordvec : number[] = _(vec.slice(1)).map((n:string)=>{
        if (n=='.') return 0; else return parseFloat(n);
      }).filter((e)=>_.isFinite(e)).value();
      if (dimension == undefined) dimension = wordvec.length;

      if (word === null || word === '') {
        errCb(iline, line, "no word")
      } else if (wordvec.length != dimension) {
        errCb(iline, line, "bad dimension " + wordvec.length) 
      }
      else {
        if (vecHook) await vecHook(word, wordvec, id);
        id++; // id keesp track of valid lines only
      }
    } catch (e) {
      throw new Error("Line " + iline + ": " + line + "\n" + (e.stack || e.toString()));
    }
  }
}