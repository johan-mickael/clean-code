import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import ExpressApplication from './src/express-application';
import container from './src/ioc/container.registry';

class ExpressServer {
  private readonly serverName = 'Express';
  private readonly serverPort = parseInt(process.env.PORT || '3000');

  constructor(private readonly expressApplication: ExpressApplication) {}

  async bootstrap() {
    // Connecting to the database
    const databaseAdapter = container.resolve<DatabaseAdapter>('DatabaseAdapter');
    await databaseAdapter.connect();

    // Configuring the express application
    const expressApplication = this.expressApplication.configureExpressApplication();

    // Running the express application
    await expressApplication.listen(this.serverPort, () => {
      console.log(`\x1b[34m%s\x1b[0m`, `${this.serverName} server is running on port ${this.serverPort}`);
    });
  }
}

const expressApplication = container.resolve<ExpressApplication>('ExpressApplication');
new ExpressServer(expressApplication).bootstrap();
