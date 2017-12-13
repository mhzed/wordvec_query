/*
* Simple Arithmetics Grammar
* ==========================
*
* Accepts expressions like "2 * (3 + 4)"
*/

{
  const instance = require("./findWordVec").instance;
  const nj = require("numjs");
  type Result = Promise<number[] | number>;

  const evalWord = async(word: string): Result => { 
    if (/^[0-9\.]+$/.test(word)) return parseFloat(word);
    else return instance.findVec(word);
  }
  const add = async(left: Result, right: Result): Result => {
    return nj.add(await left, await right);
  }
  const sub = async(left: Result, right: Result): Result => {
    return nj.subtract(await left, await right);
  }
  const mul = async(left: Result, right: Result): Result => {
    return nj.multiply(await left ,await right);
  }
  const div = async(left: Result, right: Result): Result => {
    return nj.divide(await left, await right);
  }

  async function combine(first, rest, combiners):  Result {
    var result = first, i;
    for (i = 0; i < rest.length; i++) {
      let op = rest[i][1];
      let rhs = rest[i][3];
      let opfunc = combiners[op];
      result = opfunc(result, rhs);
    }
    return result;
  }
}

Expression
 = first:Term rest:(_ ("+" / "-") _ Term)* {
     return combine(first, rest, {
       "+": add,
       "-": sub
     });
   }

Term
 = first:Factor rest:(_ ("*" / "/") _ Factor)* {
     return combine(first, rest, {
       "*": mul,
       "/": div
     });
   }

Factor
 = "(" _ expr:Expression _ ")" { return expr; }
 / Word

Word "word"
 = [a-zA-Z0-9]+ { return evalWord(text()); }
 
_ "whitespace"
 = [ \\t\\n\\r]*


