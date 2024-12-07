import { Express } from 'express';
import RouteInterface from './route-interface';
import CustomerRoutes from './customer-route';

export default class IndexRoute {
  clientRoute: RouteInterface;

  constructor() {
    this.clientRoute = new CustomerRoutes();
  }

  configureRoutes(app: Express) {
    app.use('/customers', this.clientRoute.getRouter());
  }
}
