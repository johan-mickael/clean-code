import ExpressApplication from './src/express-application';
import container from './src/ioc/container.registry';
import { HttpErrorInterceptor } from './src/middlewares/http-error-interceptor';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import MongooseAdapter from '../../databases/mongoose/src';

class ExpressServer {
  private readonly serverName = 'Express';
  private readonly serverPort = parseInt(process.env.PORT || '3000');

  constructor(private readonly expressApplication: ExpressApplication) {}

  async bootstrap() {
    // Connecting to the database
    await ExpressServer.connectToDatabase();

    // Configuring the express application
    const expressApplication = this.expressApplication.configureExpressApplication();

    // Middlewares
    expressApplication.use(HttpErrorInterceptor.handle);

    // Running the express application
    await expressApplication.listen(this.serverPort, () => {
      console.log(`\x1b[34m%s\x1b[0m`, `${this.serverName} server is running on port ${this.serverPort}`);
    });
  }

  static async connectToDatabase() {
    try {
      await ExpressServer.connectToPostgresDatabase();
      await ExpressServer.connectToMongoDatabase();
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

const expressApplication = container.resolve<ExpressApplication>('expressApplication');
new ExpressServer(expressApplication).bootstrap();
