import express, { NextFunction, Request, Response, Router } from 'express';

import PartnerController from '../controllers/partner.controller';
import RouteInterface from './route.interface';

export default class PartnerRoute implements RouteInterface {
  constructor(
    private readonly partnerController: PartnerController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (request: Request, response: Response) => {
      this.partnerController.list(request, response);
    });

    this.expressCoreRouter.get('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.partnerController.getById(request, response, nextFunction);
    });

    this.expressCoreRouter.post('/', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.partnerController.create(request, response, nextFunction);
    });

    this.expressCoreRouter.put('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.partnerController.update(request, response, nextFunction);
    });

    this.expressCoreRouter.delete('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.partnerController.delete(request, response, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
