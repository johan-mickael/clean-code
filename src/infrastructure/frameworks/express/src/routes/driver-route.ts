import express, { NextFunction, Request, Response, Router } from 'express';

import DriverController from '../controllers/driver.controller';
import RouteInterface from './route.interface';

export default class DriverRoute implements RouteInterface {
  constructor(
    private readonly driverController: DriverController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (request: Request, response: Response) => {
      this.driverController.list(request, response);
    });

    this.expressCoreRouter.get('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverController.getById(request, response, nextFunction);
    });

    this.expressCoreRouter.post('/', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverController.create(request, response, nextFunction);
    });

    this.expressCoreRouter.put('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverController.update(request, response, nextFunction);
    });

    this.expressCoreRouter.delete('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverController.delete(request, response, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
