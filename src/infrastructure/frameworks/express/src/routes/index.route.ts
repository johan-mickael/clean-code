import { Express } from 'express';
import HelloRoute from './hello.route';
import RouteInterface from './route-interface';
import ClientRoute from './client.route';

export default class Routes {
  helloRoute: RouteInterface;
  clientRoute: RouteInterface;

  constructor() {
    this.helloRoute = new HelloRoute();
    this.clientRoute = new ClientRoute();
  }

  configure(app: Express) {
    app.use('/hello', this.helloRoute.getRouter());
    app.use('/clients', this.clientRoute.getRouter());
  }
}
