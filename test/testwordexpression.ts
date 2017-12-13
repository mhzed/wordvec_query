
import * as nodeunit from 'nodeunit';
import * as wordExpressionParser from "../src/wordExpression/wordExpression"
import { VecDb } from "../src/VecDb"
import { instance } from "../src/wordExpression/findWordVec"
import * as nj from "numjs"

instance.findVec = async (word: string): Promise<number[]> => {
  switch (word) {
    case 'word1': return [1,1,1];
    case 'word2': return [2,2,2];
    default: throw new Error(word + " is not found");
  }  
}

export const exp1 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('word1', {}), [1,1,1]);
    //console.log(await wordExpressionParser.parse('word1', {}));
  })().catch(test.ifError).then(test.done);
}

export const exp2 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('word1 + word2', {}), [3,3,3]);
  })().catch(test.ifError).then(test.done);
}
export const exp3 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('(word1 + word2)/2', {}), [1.5,1.5,1.5]);
  })().catch(test.ifError).then(test.done);
}
export const exp4 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('word1 * 4 / 2', {}), [2,2,2]);
  })().catch(test.ifError).then(test.done);
}

export const exp5 = (test: nodeunit.Test) => {
  (async function body() {
    console.log(await wordExpressionParser.parse('word3', {}));
    test.ok(false, 'should throw');
  })().catch((err)=>{
    test.ok(true, 'caught error');
  }).then(test.done);
}

export const exp6 = (test: nodeunit.Test) => {
  (async function body() {
    console.log(await wordExpressionParser.parse('word4 + word2', {}));
    test.ok(false, 'should throw');
  })().catch((err)=>{
    test.ok(true, 'caught error');
  }).then(test.done);
}
