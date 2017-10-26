import * as yargs from "yargs";
import * as path from 'path';
import * as fs from 'fs';
import {Readable, Writable} from 'stream';
import {asyncIterateStream} from "async-iterate-stream";
import * as byline from 'byline';
import * as _ from 'lodash';

async function vecSplit (src: Readable, labels: Writable, vectors: Writable) : Promise<void> {
  for await (const line of asyncIterateStream(byline(src), false)) {
    let vec = line.toString().split(/\s+/);
    labels.write(vec[0]+"\n");
    vec = _.map(vec.slice(1), (n)=>{if (n=='.') return '0.0'; else return n;});
    vectors.write(vec.join(' ')+"\n");
  }
}
(async function main() {
  const args = yargs.usage(`Usage: $0 input_file`)
          .option('force', {
            alias: 'f',
            describe: 'override output files if exist'
          })
          .demandCommand(1)
      //.help('help')     // --help for help
  ;
  const argv = args.argv;

  const pathToFile = path.resolve(argv._[0])
  
  if (!fs.existsSync(pathToFile)) throw new Error(`Cant' find ${pathToFile}`);
  const labelFile = pathToFile+".label";
  const vectorFile = pathToFile+".vectors";
  
  if (fs.existsSync(labelFile)&&!('force' in argv)) {
    throw new Error(`${labelFile} already exits. -f to override`);
  }
  let labelStream = fs.createWriteStream(labelFile);
  if (fs.existsSync(vectorFile)&&!('force' in argv)) {
    throw new Error(`${vectorFile} already exits. -f to override`);
  }
  let vectorStream = fs.createWriteStream(vectorFile);
  
  await vecSplit(fs.createReadStream(pathToFile), labelStream, vectorStream);
  
})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
  process.exit(0);
}) 

