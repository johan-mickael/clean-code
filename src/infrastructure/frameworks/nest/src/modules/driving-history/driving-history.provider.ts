import CreateDrivingHistoryCommandHandler from '@triumph/application/commands/driving-history/create-driving-history/create-driving-history.command-handler';
import CreateDrivingHistoryUseCase from '@triumph/application/commands/driving-history/create-driving-history/create-driving-history.usecase';
import DeleteDrivingHistoryCommandHandler from '@triumph/application/commands/driving-history/delete-driving-history/delete-driving-history.command-handler';
import DeleteDrivingHistoryUseCase from '@triumph/application/commands/driving-history/delete-driving-history/delete-driving-history.usecase';
import UpdateDrivingHistoryCommandHandler from '@triumph/application/commands/driving-history/update-driving-history/update-driving-history.command-handler';
import UpdateDrivingHistoryUseCase from '@triumph/application/commands/driving-history/update-driving-history/update-driving-history.usecase';
import DrivingHistoryRepositoryReader from '@triumph/application/ports/repositories/readers/driving-history-repository-reader';
import DrivingHistoryRepositoryWriter from '@triumph/application/ports/repositories/writers/driving-history-repository-writer';
import GetDrivingHistoryByIdentifierQueryHandler from '@triumph/application/queries/driving-history/get-driving-history-by-identifier/get-driving-history-by-identifier.query-handler';
import GetDrivingHistoryByIdentifierUseCase from '@triumph/application/queries/driving-history/get-driving-history-by-identifier/get-driving-history-by-identifier.usecase';
import ListDrivingHistoryQueryHandler from '@triumph/application/queries/driving-history/list-driving-history/list-driving-history.query-handler';
import ListDrivingHistoryUseCase from '@triumph/application/queries/driving-history/list-driving-history/list-driving-history.usecase';

export const ListDrivingHistoryUseCaseProvider = {
  provide: ListDrivingHistoryUseCase,
  useFactory: (drivingHistoryRepositoryReader: DrivingHistoryRepositoryReader) =>
    new ListDrivingHistoryQueryHandler(drivingHistoryRepositoryReader),
  inject: [DrivingHistoryRepositoryReader],
};

export const GetDrivingHistoryByIdentifierUseCaseProvider = {
  provide: GetDrivingHistoryByIdentifierUseCase,
  useFactory: (drivingHistoryRepositoryReader: DrivingHistoryRepositoryReader) =>
    new GetDrivingHistoryByIdentifierQueryHandler(drivingHistoryRepositoryReader),
  inject: [DrivingHistoryRepositoryReader],
};

export const CreateDrivingHistoryUseCaseProvider = {
  provide: CreateDrivingHistoryUseCase,
  useFactory: (drivingHistoryRepositoryWriter: DrivingHistoryRepositoryWriter) =>
    new CreateDrivingHistoryCommandHandler(drivingHistoryRepositoryWriter),
  inject: [DrivingHistoryRepositoryWriter],
};

export const UpdateDrivingHistoryUseCaseProvider = {
  provide: UpdateDrivingHistoryUseCase,
  useFactory: (drivingHistoryRepositoryWriter: DrivingHistoryRepositoryWriter) =>
    new UpdateDrivingHistoryCommandHandler(drivingHistoryRepositoryWriter),
  inject: [DrivingHistoryRepositoryWriter],
};

export const DeleteDrivingHistoryUseCaseProvider = {
  provide: DeleteDrivingHistoryUseCase,
  useFactory: (drivingHistoryRepositoryWriter: DrivingHistoryRepositoryWriter) =>
    new DeleteDrivingHistoryCommandHandler(drivingHistoryRepositoryWriter),
  inject: [DrivingHistoryRepositoryWriter],
};
