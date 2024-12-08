import sequelizeConfigOptions from './sequelize.config';
import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const appEnvironment = process.env.NODE_ENV || 'development';

type AppEnvironment = 'development' | 'test' | 'production';
const sequelizeConfigOptionsTyped = sequelizeConfigOptions[appEnvironment as AppEnvironment] as SequelizeOptions;

const sequelizeConnection = new Sequelize(sequelizeConfigOptionsTyped);

export default sequelizeConnection;
