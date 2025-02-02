import CreateDriverLicenseCommandHandler from '@triumph/application/commands/driver-licenses/create-driver-license/create-driver-license.command-handler';
import CreateDriverLicenseUseCase from '@triumph/application/commands/driver-licenses/create-driver-license/create-driver-license.usecase';
import DeleteDriverLicenseCommandHandler from '@triumph/application/commands/driver-licenses/delete-driver-license/delete-driver-license.command-handler';
import DeleteDriverLicenseUseCase from '@triumph/application/commands/driver-licenses/delete-driver-license/delete-driver-license.usecase';
import UpdateDriverLicenseCommandHandler from '@triumph/application/commands/driver-licenses/update-driver-license/update-driver-license.command-handler';
import UpdateDriverLicenseUseCase from '@triumph/application/commands/driver-licenses/update-driver-license/update-driver-license.usecase';
import DriverLicenseRepositoryReader from '@triumph/application/ports/repositories/readers/driver-license-repository-reader';
import DriverLicenseRepositoryWriter from '@triumph/application/ports/repositories/writers/driver-license-repository-writer';
import GetDriverLicenseByIdentifierQueryHandler from '@triumph/application/queries/driver-licenses/get-driver-license-by-identifier/get-driver-license-by-identifier.query-handler';
import GetDriverLicenseByIdentifierUseCase from '@triumph/application/queries/driver-licenses/get-driver-license-by-identifier/get-driver-license-by-identifier.usecase';
import ListDriverLicensesQueryHandler from '@triumph/application/queries/driver-licenses/list-driver-licenses/list-driver-licenses.query-handler';
import ListDriverLicensesUseCase from '@triumph/application/queries/driver-licenses/list-driver-licenses/list-driver-licenses.usecase';

export const ListDriverLicensesUseCaseProvider = {
  provide: ListDriverLicensesUseCase,
  useFactory: (driverLicenseRepositoryReader: DriverLicenseRepositoryReader) =>
    new ListDriverLicensesQueryHandler(driverLicenseRepositoryReader),
  inject: [DriverLicenseRepositoryReader],
};

export const GetDriverLicenseByIdentifierUseCaseProvider = {
  provide: GetDriverLicenseByIdentifierUseCase,
  useFactory: (driverLicenseRepositoryReader: DriverLicenseRepositoryReader) =>
    new GetDriverLicenseByIdentifierQueryHandler(driverLicenseRepositoryReader),
  inject: [DriverLicenseRepositoryReader],
};

export const CreateDriverLicenseUseCaseProvider = {
  provide: CreateDriverLicenseUseCase,
  useFactory: (driverLicenseRepositoryWriter: DriverLicenseRepositoryWriter) =>
    new CreateDriverLicenseCommandHandler(driverLicenseRepositoryWriter),
  inject: [DriverLicenseRepositoryWriter],
};

export const UpdateDriverLicenseUseCaseProvider = {
  provide: UpdateDriverLicenseUseCase,
  useFactory: (driverLicenseRepositoryWriter: DriverLicenseRepositoryWriter) =>
    new UpdateDriverLicenseCommandHandler(driverLicenseRepositoryWriter),
  inject: [DriverLicenseRepositoryWriter],
};

export const DeleteDriverLicenseUseCaseProvider = {
  provide: DeleteDriverLicenseUseCase,
  useFactory: (driverLicenseRepositoryWriter: DriverLicenseRepositoryWriter) =>
    new DeleteDriverLicenseCommandHandler(driverLicenseRepositoryWriter),
  inject: [DriverLicenseRepositoryWriter],
};
