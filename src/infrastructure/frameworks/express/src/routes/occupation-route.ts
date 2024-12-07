import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import CustomerController from '../controllers/customer-controller';
import container from '../ioc/container';

export default class OccupationRoute implements RouteInterface {
  router: Router;
  occupationController: CustomerController;

  constructor() {
    this.router = express.Router();
    this.occupationController = container.resolve<CustomerController>('OccupationController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.occupationController.all(req, res);
    });

    return this.router;
  }
}
