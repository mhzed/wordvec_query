
import * as nodeunit from 'nodeunit';
import * as wordExpressionParser from "../src/wordExpression/wordExpression"
import { VecDb } from "../src/VecDb"
import { instance } from "../src/wordExpression/findWordVec"
import * as nj from "numjs"

instance.findVec = async (word: string): Promise<number[]> => {
  switch (word) {
    case 'word1': return [1,1,1];
    case 'word2': return [2,2,2];
    case 'word3': return [3,3,3];
    case 'food':  return [4,4,4];
    case 'root': return [5,5,5];
    case 'coffee': return [6,6,6]
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
    console.log(await wordExpressionParser.parse('wordx', {}));
    test.ok(false, 'should throw');
  })().catch((err)=>{
    test.ok(true, 'caught error');
  }).then(test.done);
}

export const exp6 = (test: nodeunit.Test) => {
  (async function body() {
    console.log(await wordExpressionParser.parse('wordx + word2', {}));
    test.ok(false, 'should throw');
  })().catch((err)=>{
    test.ok(true, 'caught error');
  }).then(test.done);
}

export const exp7 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('word1+word2-word3', {}), [0,0,0]);
  })().catch(test.ifError).then(test.done);
}

export const exp8 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('food-root+coffee', {}), [5,5,5]);
  })().catch(test.ifError).then(test.done);
}

export const exp9 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('-food', {}), [-4,-4,-4]);
  })().catch(test.ifError).then(test.done);
}

export const exp10 = (test: nodeunit.Test) => {
  (async function body() {
    test.deepEqual(await wordExpressionParser.parse('-(food-root+coffee)', {}), [-5,-5,-5]);
  })().catch(test.ifError).then(test.done);
}
