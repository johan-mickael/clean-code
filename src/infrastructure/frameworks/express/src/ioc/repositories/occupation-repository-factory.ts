import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import MongooseAdapter from '../../../../../databases/mongoose/src';
import SequelizeOccupationRepository from '@triumph/sequelize-adapter/src/repositories/occupation-repository-reader';
import MongooseOccupationRepository from '../../../../../databases/mongoose/src/repositories/occupation-repository-reader';
import InvalidDatabaseAdapterError from '@triumph/shared-infrastructure/errors/invalid-database-adapter-error';

export default class OccupationRepositoryFactory {
  constructor(private databaseAdapter: DatabaseAdapter) {}

  create() {
    if (this.databaseAdapter instanceof SequelizeAdapter) {
      return new SequelizeOccupationRepository();
    }
    if (this.databaseAdapter instanceof MongooseAdapter) {
      return new MongooseOccupationRepository();
    }

    throw new InvalidDatabaseAdapterError();
  }
}
