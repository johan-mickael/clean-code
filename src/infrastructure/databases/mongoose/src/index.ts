import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import MongooseConnection from './config/mongoose.connection';

export default class MongooseAdapter implements DatabaseAdapter {
  async connect(): Promise<void> {
    await new MongooseConnection().initialize();
  }
}
