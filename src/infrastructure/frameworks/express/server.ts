import sequelizeConnection from '@triumph/sequelize-adapter/src';
import ExpressApp from './express-application';

const serverName = 'Express';
const serverPort = Number(process.env.PORT || 3000);
const expressApplication = new ExpressApp(serverPort);

const run = async () => {
  await sequelizeConnection.sync({ force: true })
    .then(() => {
      console.log('\x1b[32m', 'Database synchronized successfully in ExpressApplication');
    })
    .catch((error) => {
      console.error('\x1b[31m', 'Database synchronization failed in ExpressApplication', error);
    });

  expressApplication.initialize().listen(serverPort, () => {
    console.log(`\x1b[34m%s\x1b[0m`, `${serverName} server is running on port ${serverPort}`);
  });
}

run();
