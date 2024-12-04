import express, { Request, Response, Express } from 'express';
import ServerInterface from '../ServerInterface';

export default class ExpressServer implements ServerInterface {
  private app: Express;
  name: string;

  constructor(private readonly port: number) {
    this.app = express();
    this.name = 'Express';
  }

  start() {
    this.app.listen(this.port, () => {
      console.info(`${this.name} server listening on port ${this.port}`);
    });
  }
}
