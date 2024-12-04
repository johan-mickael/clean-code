import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import ClientController from '../controllers/client.controller';
import container from '../ioc/container';

export default class ClientRoute implements RouteInterface {
  router: Router;
  clientController: ClientController;

  constructor() {
    this.router = express.Router();
    this.clientController =
      container.resolve<ClientController>('clientController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.clientController.all(req, res);
    });

    return this.router;
  }
}
