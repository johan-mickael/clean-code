import { Module } from '@nestjs/common';

import BikeModelController from '../../controllers/bike-model.controller';
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
  controllers: [BikeModelController],
  providers: [
    BikeModelRepositoryReaderProvider,
    BikeModelRepositoryWriterProvider,
    ListBikeModelsUseCaseProvider,
    GetBikeModelByIdentifierUseCaseProvider,
    CreateBikeModelUseCaseProvider,
    UpdateBikeModelUseCaseProvider,
    DeleteBikeModelUseCaseProvider,
  ],
  exports: [
    ListBikeModelsUseCaseProvider,
    GetBikeModelByIdentifierUseCaseProvider,
    CreateBikeModelUseCaseProvider,
    UpdateBikeModelUseCaseProvider,
    DeleteBikeModelUseCaseProvider,
  ],
})
export class BikeModelModule {}
