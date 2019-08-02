import * as express from 'express';
import * as bodyParser from 'body-parser'
import { thriftExpress } from '@creditkarma/thrift-server-express';
import {
  WordvecQueryService,
  WordvecQueryServiceHandler,
  VecDb
} from '..';

export const bindToExpress = (app: express.Application, urlPath: string ,vecDb: VecDb) : express.Application => {
  app.use(urlPath, bodyParser.raw(), thriftExpress(
      WordvecQueryService.Processor,
      new WordvecQueryServiceHandler(vecDb)
  ));
  return app;
};
