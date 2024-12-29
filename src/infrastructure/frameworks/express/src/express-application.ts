import express, { Express } from 'express';

import { HttpErrorInterceptor } from './middlewares/http-error-interceptor';
import Routes from './routes/index-route';

export default class ExpressApplication {
  constructor(private routes: Routes) {}

  configureExpressApplication(): Express {
    const expressCore = express();

    // Accepting JSON payloads
    expressCore.use(express.json());
    expressCore.use(express.urlencoded({ extended: true }));

    // Setting up routes
    this.routes.configureRoutes(expressCore);

    // Setting up middlewares
    expressCore.use(HttpErrorInterceptor.handle);

    return expressCore;
  }
}
