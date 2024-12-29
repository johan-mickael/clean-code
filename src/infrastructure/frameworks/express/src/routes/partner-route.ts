import express, { NextFunction, Request, Response, Router } from 'express';

import PartnerController from '../controllers/partner-controller';
import RouteInterface from './route-interface';

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
