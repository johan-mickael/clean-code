import { Express } from 'express';
import RouteInterface from './route-interface';
import DealerRoute from './dealer-route';
import OccupationRoute from './occupation-route';

export default class IndexRoute {
  private dealerRoute: RouteInterface;
  private occupationRoute: RouteInterface;

  constructor() {
    this.dealerRoute = new DealerRoute();
    this.occupationRoute = new OccupationRoute();
  }

  configureRoutes(app: Express) {
    app.use('/dealers', this.dealerRoute.getRouter());
    app.use('/occupations', this.occupationRoute.getRouter());
  }
}
