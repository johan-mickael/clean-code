import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import MongooseAdapter from '../../../../../databases/mongoose/src';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/dealer-repository-reader';
import MongooseDealerRepository from '../../../../../databases/mongoose/src/repositories/dealer-repository-reader';
import InvalidDatabaseAdapterError from '@triumph/shared-infrastructure/errors/invalid-database-adapter-error';

export default class DealerRepositoryFactory {
  constructor(private databaseAdapter: DatabaseAdapter) {}

  create() {
    if (this.databaseAdapter instanceof SequelizeAdapter) {
      return new SequelizeDealerRepository();
    }
    if (this.databaseAdapter instanceof MongooseAdapter) {
      return new MongooseDealerRepository();
    }

    throw new InvalidDatabaseAdapterError();
  }
}
