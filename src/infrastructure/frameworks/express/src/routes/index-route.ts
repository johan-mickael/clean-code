import { Express } from 'express';
import RouteInterface from './route-interface';
import CustomerRoute from './customer-route';
import OccupationRoute from './occupation-route';

export default class IndexRoute {
  clientRoute: RouteInterface;
  occupationRoute: RouteInterface;

  constructor() {
    this.clientRoute = new CustomerRoute();
    this.occupationRoute = new OccupationRoute();
  }

  configureRoutes(app: Express) {
    app.use('/customers', this.clientRoute.getRouter());
    app.use('/occupations', this.occupationRoute.getRouter());
  }
}
