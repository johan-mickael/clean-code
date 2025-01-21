import { AwilixContainer, asClass, asFunction } from 'awilix';

import CreateDrivingHistoryCommandHandler from '@triumph/application/commands/driving-history/create-driving-history/create-driving-history.command-handler';
import DeleteDrivingHistoryCommandHandler from '@triumph/application/commands/driving-history/delete-driving-history/delete-driving-history.command-handler';
import UpdateDrivingHistoryCommandHandler from '@triumph/application/commands/driving-history/update-driving-history/update-driving-history.command-handler';
import GetDrivingHistoryByIdentifierQueryHandler from '@triumph/application/queries/driving-history/get-driving-history-by-identifier/get-driving-history-by-identifier.query-handler';
import ListDrivingHistoriesQueryHandler from '@triumph/application/queries/driving-history/list-driving-history/list-driving-history.query-handler';
import SequelizeDrivingHistoryRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driving-history.repository-reader';
import SequelizeDrivingHistoryRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driving-history.repository-writer';

import DrivingHistoryController from '../controllers/driving-history.controller';
import DrivingHistoryRoute from '../routes/driving-history-route';

const registerDrivingHistoryModule = (container: AwilixContainer) => {
  // Register repositories
  container.register({
    drivingHistoryRepositoryReader: asClass(SequelizeDrivingHistoryRepositoryReader).classic(),
    drivingHistoryRepositoryWriter: asClass(SequelizeDrivingHistoryRepositoryWriter).classic(),
  });

  // Register use cases
  container.register({
    listDrivingHistoriesUseCase: asFunction(() => {
      return new ListDrivingHistoriesQueryHandler(container.resolve('drivingHistoryRepositoryReader'));
    }).singleton(),
    getDrivingHistoryByIdentifierUseCase: asFunction(() => {
      return new GetDrivingHistoryByIdentifierQueryHandler(container.resolve('drivingHistoryRepositoryReader'));
    }).singleton(),
    createDrivingHistoryUseCase: asFunction(() => {
      return new CreateDrivingHistoryCommandHandler(container.resolve('drivingHistoryRepositoryWriter'));
    }).singleton(),
    updateDrivingHistoryUseCase: asFunction(() => {
      return new UpdateDrivingHistoryCommandHandler(container.resolve('drivingHistoryRepositoryWriter'));
    }).singleton(),
    deleteDrivingHistoryUseCase: asFunction(() => {
      return new DeleteDrivingHistoryCommandHandler(container.resolve('drivingHistoryRepositoryWriter'));
    }).singleton(),
  });

  // Register controller
  container.register({
    drivingHistoryController: asClass(DrivingHistoryController).classic(),
  });

  // Register routes
  container.register({
    drivingHistoryRoute: asClass(DrivingHistoryRoute).classic(),
  });
};

export default registerDrivingHistoryModule;
