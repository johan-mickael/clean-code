import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ServerInterface from '../ServerInterface';

export default class NestServer implements ServerInterface {
  name: string;
  constructor(private readonly port: number) {
    this.name = 'Nest';
  }

  async start() {
    const app = await NestFactory.create(AppModule);
    await app.listen(this.port, () => {
      console.info(`${this.name} server listening on port ${this.port}`);
    });
  }
}
