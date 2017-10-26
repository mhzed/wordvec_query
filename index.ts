import * as levelup from "levelup";
import leveldown from "leveldown";
const db = levelup(leveldown("./db"));

(async function main() {
  await db.put("1", "one");
  await db.put(1, "number one");
  
  let v = await db.get('1');
  console.log(v.toString());
  v = await db.get(1);
  console.log(v.toString());
  
  await db.put("array", [1,2,3,4]);
  v = await db.get("array");
  console.log(v.toString());
  console.log([1,2,3,4].toString());
})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
  process.exit(0);
})

