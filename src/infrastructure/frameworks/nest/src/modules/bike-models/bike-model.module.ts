import { Module } from '@nestjs/common';

import BikeModelReaderController from '../../controllers/bike-models/bike-model.reader.controller';
import BikeModelWriterController from '../../controllers/bike-models/bike-model.writer.controller';
import {
  BikeModelRepositoryReaderProvider,
  BikeModelRepositoryWriterProvider,
  CreateBikeModelUseCaseProvider,
  DeleteBikeModelUseCaseProvider,
  GetBikeModelByIdentifierUseCaseProvider,
  ListBikeModelsUseCaseProvider,
  UpdateBikeModelUseCaseProvider,
} from './bike-model.provider';

@Module({
  imports: [],
  controllers: [BikeModelReaderController, BikeModelWriterController],
  providers: [
    BikeModelRepositoryReaderProvider,
    BikeModelRepositoryWriterProvider,
    ListBikeModelsUseCaseProvider,
    GetBikeModelByIdentifierUseCaseProvider,
    CreateBikeModelUseCaseProvider,
    UpdateBikeModelUseCaseProvider,
    DeleteBikeModelUseCaseProvider,
  ],
  exports: [],
})
export class BikeModelModule {}
