import CreateBikeModelCommandHandler from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model.command-handler';
import CreateBikeModelUseCase from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model.usecase';
import DeleteBikeModelCommandHandler from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model.command-handler';
import DeleteBikeModelUseCase from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model.usecase';
import UpdateBikeModelCommandHandler from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model.command-handler';
import UpdateBikeModelUseCase from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model.usecase';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/readers/bike-model.repository-reader';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/writers/bike-model.repository-writer';
import GetBikeModelByIdentifierQueryHandler from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.query-handler';
import GetBikeModelByIdentifierUseCase from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.usecase';
import ListBikeModelsQueryHandler from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.query-handler';
import ListBikeModelsUseCase from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.usecase';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike-model.repository-reader';
import SequelizeBikeModelRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/bike-model.repository-writer';

export const BikeModelRepositoryReaderProvider = {
  provide: BikeModelRepositoryReader,
  useClass: SequelizeBikeModelRepositoryReader,
};

export const BikeModelRepositoryWriterProvider = {
  provide: BikeModelRepositoryWriter,
  useClass: SequelizeBikeModelRepositoryWriter,
};

export const ListBikeModelsUseCaseProvider = {
  provide: ListBikeModelsUseCase,
  useFactory: (bikeModelRepositoryReader: BikeModelRepositoryReader) =>
    new ListBikeModelsQueryHandler(bikeModelRepositoryReader),
  inject: [BikeModelRepositoryReader],
};

export const GetBikeModelByIdentifierUseCaseProvider = {
  provide: GetBikeModelByIdentifierUseCase,
  useFactory: (bikeModelRepositoryReader: BikeModelRepositoryReader) =>
    new GetBikeModelByIdentifierQueryHandler(bikeModelRepositoryReader),
  inject: [BikeModelRepositoryReader],
};

export const CreateBikeModelUseCaseProvider = {
  provide: CreateBikeModelUseCase,
  useFactory: (bikeModelRepositoryWriter: BikeModelRepositoryWriter) =>
    new CreateBikeModelCommandHandler(bikeModelRepositoryWriter),
  inject: [BikeModelRepositoryWriter],
};

export const UpdateBikeModelUseCaseProvider = {
  provide: UpdateBikeModelUseCase,
  useFactory: (bikeModelRepositoryWriter: BikeModelRepositoryWriter) =>
    new UpdateBikeModelCommandHandler(bikeModelRepositoryWriter),
  inject: [BikeModelRepositoryWriter],
};

export const DeleteBikeModelUseCaseProvider = {
  provide: DeleteBikeModelUseCase,
  useFactory: (bikeModelRepositoryWriter: BikeModelRepositoryWriter) =>
    new DeleteBikeModelCommandHandler(bikeModelRepositoryWriter),
  inject: [BikeModelRepositoryWriter],
};
