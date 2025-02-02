import CreateDriverCommandHandler from '@triumph/application/commands/drivers/create-driver/create-driver.command-handler';
import CreateDriverUseCase from '@triumph/application/commands/drivers/create-driver/create-driver.usecase';
import DeleteDriverCommandHandler from '@triumph/application/commands/drivers/delete-driver/delete-driver.command-handler';
import DeleteDriverUseCase from '@triumph/application/commands/drivers/delete-driver/delete-driver.usecase';
import UpdateDriverCommandHandler from '@triumph/application/commands/drivers/update-driver/update-driver.command-handler';
import UpdateDriverUseCase from '@triumph/application/commands/drivers/update-driver/update-driver.usecase';
import DriverRepositoryReader from '@triumph/application/ports/repositories/readers/driver-repository-reader';
import DriverRepositoryWriter from '@triumph/application/ports/repositories/writers/driver-repository-writer';
import GetDriverByIdentifierQueryHandler from '@triumph/application/queries/drivers/get-driver-by-identifier/get-driver-by-identifier.query-handler';
import GetDriverByIdentifierUseCase from '@triumph/application/queries/drivers/get-driver-by-identifier/get-driver-by-identifier.usecase';
import ListDriversQueryHandler from '@triumph/application/queries/drivers/list-drivers/list-drivers.query-handler';
import ListDriversUseCase from '@triumph/application/queries/drivers/list-drivers/list-drivers.usecase';

export const ListDriversUseCaseProvider = {
  provide: ListDriversUseCase,
  useFactory: (driverRepositoryReader: DriverRepositoryReader) => new ListDriversQueryHandler(driverRepositoryReader),
  inject: [DriverRepositoryReader],
};

export const GetDriverByIdentifierUseCaseProvider = {
  provide: GetDriverByIdentifierUseCase,
  useFactory: (driverRepositoryReader: DriverRepositoryReader) =>
    new GetDriverByIdentifierQueryHandler(driverRepositoryReader),
  inject: [DriverRepositoryReader],
};

export const CreateDriverUseCaseProvider = {
  provide: CreateDriverUseCase,
  useFactory: (driverRepositoryWriter: DriverRepositoryWriter) =>
    new CreateDriverCommandHandler(driverRepositoryWriter),
  inject: [DriverRepositoryWriter],
};

export const UpdateDriverUseCaseProvider = {
  provide: UpdateDriverUseCase,
  useFactory: (driverRepositoryWriter: DriverRepositoryWriter) =>
    new UpdateDriverCommandHandler(driverRepositoryWriter),
  inject: [DriverRepositoryWriter],
};

export const DeleteDriverUseCaseProvider = {
  provide: DeleteDriverUseCase,
  useFactory: (driverRepositoryWriter: DriverRepositoryWriter) =>
    new DeleteDriverCommandHandler(driverRepositoryWriter),
  inject: [DriverRepositoryWriter],
};
