import { Module } from '@nestjs/common';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/readers/bike-model-repository-reader';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/writers/bike-model-repository-writer';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike-model-repository-reader';
import SequelizeBikeModelRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/bike-model-repository-writer';

import BikeModelController from '../controllers/bike-model-controller';

@Module({
  imports: [],
  controllers: [BikeModelController],
  providers: [
    {
      provide: BikeModelRepositoryReader,
      useClass: SequelizeBikeModelRepositoryReader,
    },
    {
      provide: BikeModelRepositoryWriter,
      useClass: SequelizeBikeModelRepositoryWriter,
    },
  ],
  exports: [],
})
export class BikeModelModule {}
