import { Express } from 'express';
import RouteInterface from './route-interface';
import CustomerRoutes from './customer-route';

export default class IndexRoute {
  clientRoute: RouteInterface;

  constructor() {
    this.clientRoute = new CustomerRoutes();
  }

  configure(app: Express) {
    app.use('/clients', this.clientRoute.getRouter());
  }
}
