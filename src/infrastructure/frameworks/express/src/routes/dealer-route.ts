import { NextFunction, Request, Response, Router } from 'express';

import DealerController from '../controllers/dealer-controller';
import RouteInterface from './route-interface';

export default class DealerRoute implements RouteInterface {
  constructor(
    private readonly dealerController: DealerController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (req: Request, res: Response) => {
      this.dealerController.list(req, res);
    });

    this.expressCoreRouter.get('/:id', async (req: Request, res: Response, nextFunction: NextFunction) => {
      this.dealerController.getById(req, res, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
