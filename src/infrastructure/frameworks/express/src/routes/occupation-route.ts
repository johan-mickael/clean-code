import express, { Request, Response, Express, Router, NextFunction } from 'express';
import RouteInterface from './route-interface';
import container from '../ioc/container.registry';
import OccupationController from '../controllers/occupation-controller';

export default class OccupationRoute implements RouteInterface {
  router: Router;
  occupationController: OccupationController;

  constructor() {
    this.router = express.Router();
    this.occupationController = container.resolve<OccupationController>('OccupationController');
  }

  getRouter() {
    this.router.get('/', async (req: Request, res: Response) => {
      this.occupationController.list(req, res);
    });

    this.router.get('/:id', async (req: Request, res: Response, nextFunction: NextFunction) => {
      this.occupationController.getById(req, res, nextFunction);
    });

    this.router.get('/search/:keyword', async (req: Request, res: Response) => {
      this.occupationController.searchByName(req, res);
    });

    return this.router;
  }
}
