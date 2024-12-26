import { Provider } from '@nestjs/common';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import SequelizeOccupationRepository from '../../../../databases/sequelize/src/repositories/occupation-repository-reader';
import MongooseOccupationRepository from '../../../../databases/mongoose/src/repositories/occupation-repository-reader';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import MongooseAdapter from '../../../../databases/mongoose/src';
import InvalidDatabaseAdapterError from '@triumph/shared-infrastructure/errors/invalid-database-adapter-error';

export const OccupationRepositoryProvider: Provider = {
  provide: OccupationRepositoryReader,
  inject: [DatabaseAdapter],
  useFactory: (databaseAdapter: DatabaseAdapter) => {
    if (databaseAdapter instanceof SequelizeAdapter) {
      return new SequelizeOccupationRepository();
    }
    if (databaseAdapter instanceof MongooseAdapter) {
      return new MongooseOccupationRepository();
    }
    throw new InvalidDatabaseAdapterError();
  },
};
