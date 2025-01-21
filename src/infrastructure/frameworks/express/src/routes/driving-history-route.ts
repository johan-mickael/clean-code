import express, { NextFunction, Request, Response, Router } from 'express';

import DrivingHistoryController from '../controllers/driving-history.controller';
import RouteInterface from './route.interface';

export default class DrivingHistoryRoute implements RouteInterface {
  constructor(
    private readonly drivingHistoryController: DrivingHistoryController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (request: Request, response: Response) => {
      this.drivingHistoryController.list(request, response);
    });

    this.expressCoreRouter.get('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingHistoryController.getById(request, response, nextFunction);
    });

    this.expressCoreRouter.post('/', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingHistoryController.create(request, response, nextFunction);
    });

    this.expressCoreRouter.put('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingHistoryController.update(request, response, nextFunction);
    });

    this.expressCoreRouter.delete('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingHistoryController.delete(request, response, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
