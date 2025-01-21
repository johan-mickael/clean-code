import { AwilixContainer, asClass, asFunction } from 'awilix';

import CreateDriverCommandHandler from '@triumph/application/commands/drivers/create-driver/create-driver.command-handler';
import DeleteDriverCommandHandler from '@triumph/application/commands/drivers/delete-driver/delete-driver.command-handler';
import UpdateDriverCommandHandler from '@triumph/application/commands/drivers/update-driver/update-driver.command-handler';
import GetDriverByIdQueryHandler from '@triumph/application/queries/drivers/get-driver-by-identifier/get-driver-by-identifier.query-handler';
import ListDriversQueryHandler from '@triumph/application/queries/drivers/list-drivers/list-drivers.query-handler';
import SequelizeDriverRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driver.repository-reader';
import SequelizeDriverRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driver.repository-writer';

import DriverController from '../controllers/driver.controller';
import DriverRoute from '../routes/driver-route';

const registerDriverModule = (container: AwilixContainer) => {
  // Register repositories
  container.register({
    driverRepositoryReader: asClass(SequelizeDriverRepositoryReader).classic(),
    driverRepositoryWriter: asClass(SequelizeDriverRepositoryWriter).classic(),
  });

  // Register use cases
  container.register({
    listDriversUseCase: asFunction(() => {
      return new ListDriversQueryHandler(container.resolve('driverRepositoryReader'));
    }).singleton(),
    getDriverByIdUseCase: asFunction(() => {
      return new GetDriverByIdQueryHandler(container.resolve('driverRepositoryReader'));
    }).singleton(),
    createDriverUseCase: asFunction(() => {
      return new CreateDriverCommandHandler(container.resolve('driverRepositoryWriter'));
    }).singleton(),
    updateDriverUseCase: asFunction(() => {
      return new UpdateDriverCommandHandler(container.resolve('driverRepositoryWriter'));
    }).singleton(),
    deleteDriverUseCase: asFunction(() => {
      return new DeleteDriverCommandHandler(container.resolve('driverRepositoryWriter'));
    }).singleton(),
  });

  container.register({
    driverController: asClass(DriverController).classic(),
  });

  // Register routes
  container.register({
    driverRoute: asClass(DriverRoute).classic(),
  });
};

export default registerDriverModule;
