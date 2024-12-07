import sequelizeConnection from './config/sequelize.connection';

sequelizeConnection.sync({ force: true }).then(() => {
  console.log('\x1b[32m', 'Database synchronized successfully');
});
