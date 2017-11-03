
import * as thrift from "thrift";
import {createWordvecQueryServiceClient} from "./createWordvecQueryServiceClient";
import * as yargs from "yargs";

(async function main() {

  const args = yargs.usage(`Usage: $0 --server host:port word`)
      .option('server', {
        alias: 's',
        describe: 'host:port'
      })
      .option('k', {
        describe: 'how many neighbors to find',
        default: 10
      })
      .demandOption(['server'])
      .demandCommand(1);
  const argv = args.argv;
  
  const [host, port ] = argv.server.split(':');
  let client = createWordvecQueryServiceClient(host, parseInt(port));
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

