import { Express } from 'express';
import RouteInterface from './route-interface';
import OccupationRoute from './occupation-route';

export default class IndexRoute {
  occupationRoute: RouteInterface;

  constructor() {
    this.occupationRoute = new OccupationRoute();
  }

  configureRoutes(app: Express) {
    app.use('/occupations', this.occupationRoute.getRouter());
  }
}
