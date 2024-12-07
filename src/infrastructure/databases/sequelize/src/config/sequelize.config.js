/**
 * We must use a JS file here because the latest Sequelize CLI no longer support TypeScript files.
 * @issue https://github.com/sequelize/cli/issues/1099
 */

const postgresConfiguration = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  username: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'admin',
  database: process.env.POSTGRES_DB || 'triumph',
  models: [`${__dirname}/../models/*.model.ts`],
};

const modelsPath = `${__dirname}/../models/*.model.ts`;

const sequelizeConfigOptions = {
  dialect: postgresConfiguration.dialect,
  host: postgresConfiguration.host,
  port: postgresConfiguration.port,
  username: postgresConfiguration.username,
  password: postgresConfiguration.password,
  database: postgresConfiguration.database,
  models: [modelsPath],
};

const config = {
  development: sequelizeConfigOptions,
  test: sequelizeConfigOptions,
  production: sequelizeConfigOptions,
};

module.exports = config;