import { AwilixContainer, asClass, asFunction } from 'awilix';

import CreateDriverLicenseCommandHandler from '@triumph/application/commands/driver-licenses/create-driver-license/create-driver-license.command-handler';
import DeleteDriverLicenseCommandHandler from '@triumph/application/commands/driver-licenses/delete-driver-license/delete-driver-license.command-handler';
import UpdateDriverLicenseCommandHandler from '@triumph/application/commands/driver-licenses/update-driver-license/update-driver-license.command-handler';
import GetDriverLicenseByIdQueryHandler from '@triumph/application/queries/driver-licenses/get-driver-license-by-identifier/get-driver-license-by-identifier.query-handler';
import ListDriverLicensesQueryHandler from '@triumph/application/queries/driver-licenses/list-driver-licenses/list-driver-licenses.query-handler';
import SequelizeDriverLicenseRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driver-license.repository-reader';
import SequelizeDriverLicenseRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driver-license.repository-writer';

import DriverLicenseController from '../controllers/driver-license.controller';
import DriverLicenseRoute from '../routes/driver-license-route';

const registerDriverLicenseModule = (container: AwilixContainer) => {
  // Register repositories
  container.register({
    driverLicenseRepositoryReader: asClass(SequelizeDriverLicenseRepositoryReader).classic(),
    driverLicenseRepositoryWriter: asClass(SequelizeDriverLicenseRepositoryWriter).classic(),
  });

  // Register use cases
  container.register({
    listDriverLicensesUseCase: asFunction(() => {
      return new ListDriverLicensesQueryHandler(container.resolve('driverLicenseRepositoryReader'));
    }).singleton(),
    getDriverLicenseByIdUseCase: asFunction(() => {
      return new GetDriverLicenseByIdQueryHandler(container.resolve('driverLicenseRepositoryReader'));
    }).singleton(),
    createDriverLicenseUseCase: asFunction(() => {
      return new CreateDriverLicenseCommandHandler(container.resolve('driverLicenseRepositoryWriter'));
    }).singleton(),
    updateDriverLicenseUseCase: asFunction(() => {
      return new UpdateDriverLicenseCommandHandler(container.resolve('driverLicenseRepositoryWriter'));
    }).singleton(),
    deleteDriverLicenseUseCase: asFunction(() => {
      return new DeleteDriverLicenseCommandHandler(container.resolve('driverLicenseRepositoryWriter'));
    }).singleton(),
  });

  container.register({
    driverLicenseController: asClass(DriverLicenseController).classic(),
  });

  // Register routes
  container.register({
    driverLicenseRoute: asClass(DriverLicenseRoute).classic(),
  });
};

export default registerDriverLicenseModule;
