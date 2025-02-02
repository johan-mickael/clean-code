import CreateMaintenanceDetailCommandHandler from '@triumph/application/commands/maintenance-details/create-maintenance-detail/create-maintenance-detail.command-handler';
import CreateMaintenanceDetailUseCase from '@triumph/application/commands/maintenance-details/create-maintenance-detail/create-maintenance-detail.usecase';
import DeleteMaintenanceDetailCommandHandler from '@triumph/application/commands/maintenance-details/delete-maintenance-detail/delete-maintenance-detail.command-handler';
import DeleteMaintenanceDetailUseCase from '@triumph/application/commands/maintenance-details/delete-maintenance-detail/delete-maintenance-detail.usecase';
import UpdateMaintenanceDetailCommandHandler from '@triumph/application/commands/maintenance-details/update-maintenance-detail/update-maintenance-detail.command-handler';
import UpdateMaintenanceDetailUseCase from '@triumph/application/commands/maintenance-details/update-maintenance-detail/update-maintenance-detail.usecase';
import MaintenanceDetailRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-detail-repository-reader';
import MaintenanceDetailRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-detail-repository-writer';
import GetMaintenanceDetailByIdentifierQueryHandler from '@triumph/application/queries/maintenance-details/get-maintenance-detail-by-identifier/get-maintenance-detail-by-identifier.query-handler';
import GetMaintenanceDetailByIdentifierUseCase from '@triumph/application/queries/maintenance-details/get-maintenance-detail-by-identifier/get-maintenance-detail-by-identifier.usecase';
import ListMaintenanceDetailsQueryHandler from '@triumph/application/queries/maintenance-details/list-maintenance-details/list-maintenance-details.query-handler';
import ListMaintenanceDetailsUseCase from '@triumph/application/queries/maintenance-details/list-maintenance-details/list-maintenance-details.usecase';

export const ListMaintenanceDetailsUseCaseProvider = {
  provide: ListMaintenanceDetailsUseCase,
  useFactory: (maintenanceDetailRepositoryReader: MaintenanceDetailRepositoryReader) =>
    new ListMaintenanceDetailsQueryHandler(maintenanceDetailRepositoryReader),
  inject: [MaintenanceDetailRepositoryReader],
};

export const GetMaintenanceDetailByIdentifierUseCaseProvider = {
  provide: GetMaintenanceDetailByIdentifierUseCase,
  useFactory: (maintenanceDetailRepositoryReader: MaintenanceDetailRepositoryReader) =>
    new GetMaintenanceDetailByIdentifierQueryHandler(maintenanceDetailRepositoryReader),
  inject: [MaintenanceDetailRepositoryReader],
};

export const CreateMaintenanceDetailUseCaseProvider = {
  provide: CreateMaintenanceDetailUseCase,
  useFactory: (maintenanceDetailRepositoryWriter: MaintenanceDetailRepositoryWriter) =>
    new CreateMaintenanceDetailCommandHandler(maintenanceDetailRepositoryWriter),
  inject: [MaintenanceDetailRepositoryWriter],
};

export const UpdateMaintenanceDetailUseCaseProvider = {
  provide: UpdateMaintenanceDetailUseCase,
  useFactory: (maintenanceDetailRepositoryWriter: MaintenanceDetailRepositoryWriter) =>
    new UpdateMaintenanceDetailCommandHandler(maintenanceDetailRepositoryWriter),
  inject: [MaintenanceDetailRepositoryWriter],
};

export const DeleteMaintenanceDetailUseCaseProvider = {
  provide: DeleteMaintenanceDetailUseCase,
  useFactory: (maintenanceDetailRepositoryWriter: MaintenanceDetailRepositoryWriter) =>
    new DeleteMaintenanceDetailCommandHandler(maintenanceDetailRepositoryWriter),
  inject: [MaintenanceDetailRepositoryWriter],
};
