import express, { Express } from 'express';
import ServerInterface from '../server-interface';
import IndexRoute from './src/routes/index-route';

export default class ExpressServer implements ServerInterface {
  private app: Express;
  private name: string = ExpressServer.name;
  private routes: IndexRoute;

  readonly port: number;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.routes = new IndexRoute();
  }

  start() {
    this.routes.configure(this.app);

    this.app.listen(this.port, () => {
      console.info(`${this.name} listening on port ${this.port}`);
    });
  }
}
