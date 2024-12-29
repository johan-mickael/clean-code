import { Module } from '@nestjs/common';
import BikeModelController from '../controllers/bike-model-controller';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/bike-model-repository-reader';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/bike-model-repository-reader';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/bike-model-repository-writer';
import SequelizeBikeModelRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/bike-model-repository-writer';

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
