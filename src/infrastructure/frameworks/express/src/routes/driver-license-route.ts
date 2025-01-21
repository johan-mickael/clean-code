import express, { NextFunction, Request, Response, Router } from 'express';

import DriverLicenseController from '../controllers/driver-license.controller';
import RouteInterface from './route.interface';

export default class DriverLicenseRoute implements RouteInterface {
  constructor(
    private readonly driverLicenseController: DriverLicenseController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (request: Request, response: Response) => {
      this.driverLicenseController.list(request, response);
    });

    this.expressCoreRouter.get('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverLicenseController.getById(request, response, nextFunction);
    });

    this.expressCoreRouter.post('/', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverLicenseController.create(request, response, nextFunction);
    });

    this.expressCoreRouter.put('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverLicenseController.update(request, response, nextFunction);
    });

    this.expressCoreRouter.delete('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.driverLicenseController.delete(request, response, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
