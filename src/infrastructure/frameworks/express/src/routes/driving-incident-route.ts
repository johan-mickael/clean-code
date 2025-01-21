import express, { NextFunction, Request, Response, Router } from 'express';

import DrivingIncidentController from '../controllers/driving-incident.controller';
import RouteInterface from './route.interface';

export default class DrivingIncidentRoute implements RouteInterface {
  constructor(
    private readonly drivingIncidentController: DrivingIncidentController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (request: Request, response: Response) => {
      this.drivingIncidentController.list(request, response);
    });

    this.expressCoreRouter.get('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingIncidentController.getById(request, response, nextFunction);
    });

    this.expressCoreRouter.post('/', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingIncidentController.create(request, response, nextFunction);
    });

    this.expressCoreRouter.put('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingIncidentController.update(request, response, nextFunction);
    });

    this.expressCoreRouter.delete('/:id', async (request: Request, response: Response, nextFunction: NextFunction) => {
      this.drivingIncidentController.delete(request, response, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
