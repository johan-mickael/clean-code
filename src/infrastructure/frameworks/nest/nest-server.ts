import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ServerInterface from '../server-interface';

export default class NestServer implements ServerInterface {
  private name: string = NestServer.name;

  readonly port: number;

  constructor(port: number) {
    this.port = port;
  }

  async start() {
    const app = await NestFactory.create(AppModule);
    await app.listen(this.port, () => {
      console.info(`${this.name} listening on port ${this.port}`);
    });
  }
}
