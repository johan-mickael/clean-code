import sequelizeConfigOptions from './sequelize.config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const appEnvironment = process.env.NODE_ENV || 'development';

const sequelizeConfigOptionsTyped = sequelizeConfigOptions['development'] as SequelizeOptions;

const sequelizeConnection = new Sequelize(sequelizeConfigOptionsTyped);

export default sequelizeConnection;
