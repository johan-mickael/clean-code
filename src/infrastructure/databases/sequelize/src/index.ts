import sequelizeConnection from './config/sequelize.connection';

sequelizeConnection.sync({ alter: true })
  .then(() => {
    console.log('\x1b[32m', 'Database synchronized successfully');
  })
  .catch((error) => {
    console.error('\x1b[31m', 'Database synchronization failed', error);
  });

export default sequelizeConnection;