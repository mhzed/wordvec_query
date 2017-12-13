
import * as _ from 'lodash';
import {WordvecQueryServiceFactory} from "./WordvecQueryServiceFactory";
import {WordvecQueryService} from "../thrift/vecquery";
import * as yargs from "yargs";

(async function main() {

  const args = yargs.usage(`Usage: $0 --server host:port word`)
      .option('server', {
        alias: 's',
        describe: '[http://]host:port[/path], without http:// then binary thrift connection is used'
      })
      .option('k', {
        describe: 'how many neighbors to find',
        default: 10
      })
      .demandOption(['server'])
      .demandCommand(1);
  const argv = args.argv;

  let client: WordvecQueryService.Client;
  if (_.includes(argv.server, '://')) {
    client = WordvecQueryServiceFactory.createHttpClient(argv.server);
  } else {
    const [host, port] = argv.server.split(':');
    client = WordvecQueryServiceFactory.createClient(host, parseInt(port));
  }
  let word = argv._[0];
  
  if (/,/.test(word)) {
    let words = word.split(',');
    let vecs = await Promise.all(_.map(words, (w) => client.findVec(w)))
    let average: number[] = []
    _.times(vecs[0].vector.length, (i)=>{
      let sum = 0;
      for (let v of vecs) { sum += v.vector[i] }
      average.push(sum/vecs.length);
    })
    console.log(_.map(await client.knnQueryOnVector(argv.k, average), (r) => {
      return {
        word: r.word, 
        dist: r.dist
      }
    }))
  }
  else {
    console.log(_.map(await client.knnQueryOnExpression(argv.k, word), (r) => {
      return {
        word: r.word, 
        dist: r.dist
      }
    }))
  }
})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
  process.exit(0);
}) 

