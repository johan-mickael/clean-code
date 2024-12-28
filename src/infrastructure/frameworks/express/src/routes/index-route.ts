import { Express } from 'express';
import RouteInterface from './route-interface';
import DealerRoute from './dealer-route';

export default class IndexRoute {
  private dealerRoute: RouteInterface;

  constructor() {
    this.dealerRoute = new DealerRoute();
  }

  configureRoutes(app: Express) {
    app.use('/dealers', this.dealerRoute.getRouter());
  }
}