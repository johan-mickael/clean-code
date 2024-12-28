import express, { Express } from 'express';
import IndexRoute from './routes/index-route';

export default class ExpressApplication {
  constructor(
    private expressCore: Express,
    private indexRoute: IndexRoute,
  ) {}

  configureExpressApplication(): Express {
    // Setting up routes
    this.indexRoute.configureRoutes(this.expressCore);

    return this.expressCore;
  }
}
