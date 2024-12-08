import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import CustomerController from '../controllers/customer-controller';
import container from '../ioc/container.registry';

export default class CustomerRoute implements RouteInterface {
  router: Router;
  customerController: CustomerController;

  constructor() {
    this.router = express.Router();
    this.customerController = container.resolve<CustomerController>('CustomerController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.customerController.all(req, res);
    });

    return this.router;
  }
}
