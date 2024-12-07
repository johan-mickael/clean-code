import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

export default class NestApplication {
  readonly port: number;

  constructor(port: number) {
    this.port = port;
  }

  async initialize(): Promise<INestApplication<any>> {
    return await NestFactory.create(AppModule);
  }
}
