import { AwilixContainer, asClass, asFunction } from 'awilix';

import CreateBikeModelCommandHandler from '@triumph/application/commands/bike-models/create-bike-model/create-bike-model.command-handler';
import DeleteBikeModelCommandHandler from '@triumph/application/commands/bike-models/delete-bike-model/delete-bike-model.command-handler';
import UpdateBikeModelCommandHandler from '@triumph/application/commands/bike-models/update-bike-model/update-bike-model.command-handler';
import GetBikeModelByIdentifierQueryHandler from '@triumph/application/queries/bike-models/get-bike-model-by-identifier/get-bike-model-by-identifier.query-handler';
import ListBikeModelsQueryHandler from '@triumph/application/queries/bike-models/list-bike-models/list-bike-models.query-handler';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike-model.repository-reader';
import SequelizeBikeModelRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/bike-model.repository-writer';

import BikeModelController from '../controllers/bike-model.controller';
import BikeModelRoute from '../routes/bike-model.route';

const registerBikeModelModule = (container: AwilixContainer) => {
  // Register repositories
  container.register({
    bikeModelRepositoryReader: asClass(SequelizeBikeModelRepositoryReader).classic(),
    bikeModelRepositoryWriter: asClass(SequelizeBikeModelRepositoryWriter).classic(),
  });

  // Register use cases
  container.register({
    listBikeModelsUseCase: asFunction(() => {
      return new ListBikeModelsQueryHandler(container.resolve('bikeModelRepositoryReader'));
    }).singleton(),
    getBikeModelByIdentifierUseCase: asFunction(() => {
      return new GetBikeModelByIdentifierQueryHandler(container.resolve('bikeModelRepositoryReader'));
    }).singleton(),
    createBikeModelUseCase: asFunction(() => {
      return new CreateBikeModelCommandHandler(container.resolve('bikeModelRepositoryWriter'));
    }).singleton(),
    updateBikeModelUseCase: asFunction(() => {
      return new UpdateBikeModelCommandHandler(container.resolve('bikeModelRepositoryWriter'));
    }).singleton(),
    deleteBikeModelUseCase: asFunction(() => {
      return new DeleteBikeModelCommandHandler(container.resolve('bikeModelRepositoryWriter'));
    }).singleton(),
  });

  container.register({
    bikeModelController: asClass(BikeModelController).classic(),
  });

  // Register routes
  container.register({
    bikeModelRoute: asClass(BikeModelRoute).classic(),
  });
};

export default registerBikeModelModule;
