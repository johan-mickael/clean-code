import express, { Request, Response, Router, NextFunction } from 'express';
import RouteInterface from './route-interface';
import PartnerController from '../controllers/partner-controller';

export default class PartnerRoute implements RouteInterface {
  constructor(
    private readonly partnerController: PartnerController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (req: Request, res: Response) => {
      this.partnerController.list(req, res);
    });

    this.expressCoreRouter.get('/:id', async (req: Request, res: Response, nextFunction: NextFunction) => {
      this.partnerController.getById(req, res, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
