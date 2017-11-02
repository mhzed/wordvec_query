"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const WordvecQueryServiceClient_1 = require("./WordvecQueryServiceClient");
const yargs = require("yargs");
(function main() {
    return __awaiter(this, void 0, void 0, function* () {
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
        const [host, port] = argv.server.split(':');
        let client = new WordvecQueryServiceClient_1.WordvecQueryServiceClient(host, parseInt(port));
        let word = argv._[0];
        //console.log(await client.findVec(word));
        let res = yield client.knnQuery(argv.k, word);
        console.log(res);
    });
})().catch((err) => {
    console.error(err);
    process.exit(1);
}).then(() => {
    process.exit(0);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFHQSwyRUFBc0U7QUFDdEUsK0JBQStCO0FBRS9CLENBQUM7O1FBRUMsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQzthQUN4RCxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ2hCLEtBQUssRUFBRSxHQUFHO1lBQ1YsUUFBUSxFQUFFLFdBQVc7U0FDdEIsQ0FBQzthQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDWCxRQUFRLEVBQUUsNEJBQTRCO1lBQ3RDLE9BQU8sRUFBRSxFQUFFO1NBQ1osQ0FBQzthQUNELFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ3hCLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRXZCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxNQUFNLEdBQUcsSUFBSSxxREFBeUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyQiwwQ0FBMEM7UUFDMUMsSUFBSSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVuQixDQUFDO0NBQUEsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRztJQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNsQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDTixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xCLENBQUMsQ0FBQyxDQUFBIn0=