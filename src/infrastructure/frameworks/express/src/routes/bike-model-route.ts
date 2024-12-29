import { Request, Response, Router, NextFunction } from 'express';
import RouteInterface from './route-interface';
import BikeModelController from '../controllers/bike-model-controller';

export default class BikeModelRoute implements RouteInterface {
  constructor(
    private readonly bikeModelController: BikeModelController,
    private readonly expressCoreRouter: Router,
  ) {}

  getRouter() {
    this.expressCoreRouter.get('/', async (req: Request, res: Response) => {
      await this.bikeModelController.list(req, res);
    });

    this.expressCoreRouter.get('/:id', async (req: Request, res: Response, nextFunction: NextFunction) => {
      await this.bikeModelController.getById(req, res, nextFunction);
    });

    this.expressCoreRouter.post('/', async (req: Request, res: Response, nextFunction: NextFunction) => {
      await this.bikeModelController.create(req, res, nextFunction);
    });

    this.expressCoreRouter.put('/:id', async (req: Request, res: Response, nextFunction: NextFunction) => {
      await this.bikeModelController.update(req, res, nextFunction);
    });

    this.expressCoreRouter.delete('/:id', async (req: Request, res: Response, nextFunction: NextFunction) => {
      await this.bikeModelController.delete(req, res, nextFunction);
    });

    return this.expressCoreRouter;
  }
}
