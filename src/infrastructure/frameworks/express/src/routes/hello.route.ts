import HelloController from '../controllers/hello.controller';
import express, { Request, Response, Express, Router } from 'express';
import RouteInterface from './route-interface';

export default class HelloRoute implements RouteInterface {
  router: Router;
  helloController: HelloController;

  constructor() {
    this.router = express.Router();
    this.helloController = new HelloController();
  }

  getRouter() {
    this.router.get('/', (req: Request, res: Response) => {
      this.helloController.hello(req, res);
    });

    return this.router;
  }
}
