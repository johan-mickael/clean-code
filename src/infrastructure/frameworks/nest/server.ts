import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import { HttpErrorInterceptor } from './src/middlewares/http-error-interceptor';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import MongooseAdapter from '../../databases/mongoose/src';

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

    application.useGlobalFilters(new HttpErrorInterceptor());

    await application.listen(this.serverPort, () => {
      console.log(`\x1b[34m%s\x1b[0m`, `${this.serverName} server is running on port ${this.serverPort}`);
    });
  }

  static async connectToDatabase() {
    try {
      await NestServer.connectToPostgresDatabase();
      await NestServer.connectToMongoDatabase();
    } catch (error) {
      console.error('Error connecting to the database', error);
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
