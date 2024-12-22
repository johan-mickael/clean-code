import { Module } from '@nestjs/common';
import { OccupationModule } from './src/modules/occupation-module';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';

@Module({
  imports: [
    OccupationModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [
    {
      provide: DatabaseAdapter,
      useClass: SequelizeAdapter,
    },
  ],
  exports: [DatabaseAdapter],
})
export class AppModule {}
