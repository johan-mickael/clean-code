import express, { Request, Response, Router, NextFunction } from 'express';
import RouteInterface from './route-interface';
import container from '../ioc/container.registry';
import DealerController from '../controllers/dealer-controller';

export default class DealerRoute implements RouteInterface {
  router: Router;
  dealerController: DealerController;

  constructor() {
    this.router = express.Router();
    this.dealerController = container.resolve<DealerController>('DealerController');
  }

  getRouter() {
    this.router.get('/', async (req: Request, res: Response) => {
      this.dealerController.list(req, res);
    });

    this.router.get('/:id', async (req: Request, res: Response, nextFunction: NextFunction) => {
      this.dealerController.getById(req, res, nextFunction);
    });

    return this.router;
  }
}
