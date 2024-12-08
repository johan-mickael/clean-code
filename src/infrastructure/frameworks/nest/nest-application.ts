import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import sequelizeConnection from '@triumph/sequelize-adapter/src/config/sequelize.connection';

export default class NestApplication {
  readonly port: number;

  constructor(port: number) {
    this.port = port;
  }

  async initialize(): Promise<INestApplication<any>> {
    await sequelizeConnection.sync({ force: true })
      .then(() => {
        console.log('\x1b[32m', 'Database synchronized successfully in NestApplication');
      })
      .catch((error) => {
        console.error('\x1b[31m', 'Database synchronization failed in NestApplication', error);
      });

    return await NestFactory.create(AppModule);
  }
}
