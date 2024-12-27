import { Module } from '@nestjs/common';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';
import MongooseAdapter from '../../../../databases/mongoose/src';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: DatabaseAdapter,
      useClass: MongooseAdapter,
    },
  ],
  exports: [DatabaseAdapter],
})
export class DatabaseAdapterModule {}
