import express, { Express } from 'express';
import IndexRoute from './src/routes/index-route';

export default class ExpressApp {
  private app: Express;
  private routes: IndexRoute;

  readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.routes = new IndexRoute();
  }

  initialize(): Express {
    // Setting up routes
    this.routes.configureRoutes(this.app);

    return this.app;
  }
}
