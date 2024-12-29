import { Request, Response, Router, NextFunction } from 'express';
import RouteInterface from './route-interface';
import DealerController from '../controllers/dealer-controller';

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
