
import * as _ from 'lodash';
import {WordvecQueryServiceFactory} from "./WordvecQueryServiceFactory";
import * as yargs from "yargs";

(async function main() {

  const args = yargs.usage(`Usage: $0 --server host:port word`)
      .option('server', {
        alias: 's',
        describe: '[http://]host:port[/path], without http:// then thrift connection is used'
      })
      .option('k', {
        describe: 'how many neighbors to find',
        default: 10
      })
      .demandOption(['server'])
      .demandCommand(1);
  const argv = args.argv;

  let client;
  if (_.includes(argv.server, '://')) {
    client = WordvecQueryServiceFactory.createHttpClient(argv.server);
  } else {
    const [host, port] = argv.server.split(':');
    client = WordvecQueryServiceFactory.createClient(host, parseInt(port));
  }
  let word = argv._[0];
  
  //console.log(await client.findVec(word));
  let res = await client.knnQuery(argv.k, word);
  console.log(res);
  
})().catch((err)=>{
  console.error(err);
  process.exit(1);
}).then(()=>{
  process.exit(0);
}) 

