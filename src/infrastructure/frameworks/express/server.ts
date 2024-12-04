import express, { Request, Response, Express } from 'express';
import ServerInterface from '../ServerInterface';
import Routes from './src/routes/index.route';

export default class ExpressServer implements ServerInterface {
  private app: Express;
  name: string = ExpressServer.name;
  routes: Routes;

  constructor(private readonly port: number) {
    this.app = express();
    this.routes = new Routes();
  }

  start() {
    this.routes.configure(this.app);

    this.app.listen(this.port, () => {
      console.info(`${this.name} listening on port ${this.port}`);
    });
  }
}
