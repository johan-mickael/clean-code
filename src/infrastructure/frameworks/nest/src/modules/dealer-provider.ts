import { Provider } from '@nestjs/common';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/dealer-repository-reader';
import DealerRepositoryReader from '@triumph/application/ports/repositories/dealer-repository-reader';
import MongooseAdapter from '../../../../databases/mongoose/src';
import InvalidDatabaseAdapterError from '@triumph/shared-infrastructure/errors/invalid-database-adapter-error';
import MongooseDealerRepository from '../../../../databases/mongoose/src/repositories/dealer-repository-reader';

export const DealerRepositoryProvider: Provider = {
  provide: DealerRepositoryReader,
  inject: [DatabaseAdapter],
  useFactory: (databaseAdapter: DatabaseAdapter) => {
    if (databaseAdapter instanceof SequelizeAdapter) {
      return new SequelizeDealerRepository();
    }
    if (databaseAdapter instanceof MongooseAdapter) {
      return new MongooseDealerRepository();
    }
    throw new InvalidDatabaseAdapterError();
  },
};
