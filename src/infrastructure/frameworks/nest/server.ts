import { NestFactory } from '@nestjs/core';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';

import MongooseAdapter from '../../databases/mongoose/src';
import { AppModule } from './app.module';
import { HttpErrorInterceptor } from './src/middlewares/http-error.interceptor';

class NestServer {
  private readonly serverName = 'Nest';
  private readonly serverPort = parseInt(process.env.PORT || '3000');

  async bootstrap() {
    // Getting the application context
    const applicationContext = await NestFactory.createApplicationContext(AppModule);

    // Connecting to the database
    await NestServer.connectToDatabase();

    // Creating the application instance and running it
    const application = await NestFactory.create(AppModule);

    application.enableCors({
      origin: 'http://localhost:3030', 
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });

    application.useGlobalFilters(new HttpErrorInterceptor());

    await application.listen(this.serverPort, () => {
      console.log(`\x1b[34m%s\x1b[0m`, `${this.serverName} server is running on port ${this.serverPort}`);
    });
  }

  static async connectToDatabase() {
    try {
      NestServer.connectToPostgresDatabase();
      NestServer.connectToMongoDatabase();
    } catch (error) {
      console.error('Error connecting to the databases', error);
      process.exit(1);
    }
  }

  static async connectToPostgresDatabase() {
    const databaseAdapter = new SequelizeAdapter();
    await databaseAdapter.connect();
  }

  static async connectToMongoDatabase() {
    const databaseAdapter = new MongooseAdapter();
    await databaseAdapter.connect();
  }
}

new NestServer().bootstrap();
