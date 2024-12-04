import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';
import CustomerController from '../controllers/customer-controller';
import container from '../ioc/container';

export default class CustomerRoutes implements RouteInterface {
  router: Router;
  clientController: CustomerController;

  constructor() {
    this.router = express.Router();
    this.clientController = container.resolve<CustomerController>('customerController');
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.clientController.all(req, res);
    });

    return this.router;
  }
}
