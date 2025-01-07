import { Module } from '@nestjs/common';
import SequelizeBikeRepositoryReader from '@triumph/sequelize-adapter/src/repositories/bike/bike-repository-reader';
import SequelizeVisitRepositoryReader from '@triumph/sequelize-adapter/src/repositories/visit/visit-repository-reader';
import SequelizeVisitRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/visit/visit-repository-writer';

import { VisitController } from '../../controllers/visit/visit-controller';
import { VisitService } from '../../modules/visit/visit-services';

@Module({
  controllers: [VisitController],
  providers: [
    VisitService,
    {
      provide: 'VisitRepositoryReader',
      useClass: SequelizeVisitRepositoryReader,
    },
    {
      provide: 'VisitRepositoryWriter',
      useClass: SequelizeVisitRepositoryWriter,
    },
    {
      provide: 'BikeRepositoryReader',
      useClass: SequelizeBikeRepositoryReader,
    },
  ],
})
export class VisitModule {}
