import express, { Express, Request, Response, Router } from 'express';

import DrivingLicenseController from '../controllers/driving-license/driving-license-controller';
import DrivingLicenseControllerWriter from '../controllers/driving-license/driving-license-controller-writer';
import container from '../ioc/container.registry';
import RouteInterface from './route-interface';

export default class DrivingLicenseRoute implements RouteInterface {
  router: Router;
  drivingLicenseController: DrivingLicenseController;
  drivingLicenseControllerWriter: DrivingLicenseControllerWriter;

  constructor() {
    this.router = express.Router();
    this.drivingLicenseController = container.resolve<DrivingLicenseController>('DrivingLicenseController');
    this.drivingLicenseControllerWriter = container.resolve<DrivingLicenseControllerWriter>(
      'DrivingLicenseControllerWriter',
    );
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.drivingLicenseController.list(req, res);
    });

    this.router.get('/:id', (req: Request, res: Response) => {
      this.drivingLicenseController.getById(req, res);
    });

    this.router.get('/search/:keyword', (req: Request, res: Response) => {
      this.drivingLicenseController.search(req, res);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      this.drivingLicenseControllerWriter.create(req, res);
    });

    return this.router;
  }
}
