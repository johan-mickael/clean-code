import { Module } from '@nestjs/common';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/readers/bike-model.repository-reader';
import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner.repository-reader';
import BikeRepositoryWriter from '@triumph/application/ports/repositories/writers/bike-repository-writer';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike-model.repository-reader';
import SequelizeBikeRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike.repository-reader';
import SequelizePartnerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/partner.repository-reader';
import SequelizeBikeRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/bike.repository-writer';

import BikeReaderController from '../../controllers/bikes/bike.reader.controller';
import BikeWriterController from '../../controllers/bikes/bike.writer.controller';
import {
  CreateBikeUseCaseProvider,
  DeleteBikeUseCaseProvider,
  GetBikeByIdentifierUseCaseProvider,
  ListBikesUseCaseProvider,
  UpdateBikeUseCaseProvider,
} from './bike.provider';

@Module({
  imports: [],
  controllers: [BikeReaderController, BikeWriterController],
  providers: [
    {
      provide: BikeRepositoryReader,
      useClass: SequelizeBikeRepositoryReader,
    },
    {
      provide: BikeRepositoryWriter,
      useClass: SequelizeBikeRepositoryWriter,
    },
    {
      provide: PartnerRepositoryReader,
      useClass: SequelizePartnerRepositoryReader,
    },
    {
      provide: BikeModelRepositoryReader,
      useClass: SequelizeBikeModelRepositoryReader,
    },
    ListBikesUseCaseProvider,
    GetBikeByIdentifierUseCaseProvider,
    CreateBikeUseCaseProvider,
    UpdateBikeUseCaseProvider,
    DeleteBikeUseCaseProvider,
  ],
  exports: [
    BikeRepositoryReader,
    CreateBikeUseCaseProvider, // Ajout ici
    UpdateBikeUseCaseProvider,
    DeleteBikeUseCaseProvider,
  ],
})
export class BikeModule {}
