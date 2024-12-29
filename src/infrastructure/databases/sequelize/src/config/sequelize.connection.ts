import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

import sequelizeConfigOptions from './sequelize.config';

export default class SequelizeConnection {
  private readonly appEnvironment = process.env.NODE_ENV || 'development';

  async initialize(): Promise<Sequelize> {
    type AppEnvironment = 'development' | 'test' | 'production';

    const sequelizeConfigOptionsTyped = sequelizeConfigOptions[
      this.appEnvironment as AppEnvironment
    ] as SequelizeOptions;
    const SequelizeConnection = new Sequelize(sequelizeConfigOptionsTyped);

    await SequelizeConnection.sync({
      alter: false,
      force: false,
    });

    return SequelizeConnection;
  }
}
