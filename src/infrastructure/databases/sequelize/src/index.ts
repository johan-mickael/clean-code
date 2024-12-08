import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import SequelizeConnection from './config/sequelize.connection';

export default class SequelizeAdapter implements DatabaseAdapter {
  async connect(): Promise<void> {
    await new SequelizeConnection().initialize();
  }
}
