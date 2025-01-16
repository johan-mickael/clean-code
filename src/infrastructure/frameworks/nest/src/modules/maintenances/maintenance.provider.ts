import CreateMaintenanceCommandHandler from '@triumph/application/commands/maintenances/create-maintenance/create-maintenance.command-handler';
import CreateMaintenanceUseCase from '@triumph/application/commands/maintenances/create-maintenance/create-maintenance.usecase';
import UpdateMaintenanceCommandHandler from '@triumph/application/commands/maintenances/update-maintenance/update-maintenance.command-handler';
import UpdateMaintenanceUseCase from '@triumph/application/commands/maintenances/update-maintenance/update-maintenance.usecase';
import DeleteMaintenanceCommandHandler from '@triumph/application/commands/maintenances/delete-maintenance/delete-maintenance.command-handler';
import DeleteMaintenanceUseCase from '@triumph/application/commands/maintenances/delete-maintenance/delete-maintenance.usecase';
import MaintenanceRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-repository-reader';
import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';
import GetMaintenanceByIdentifierQueryHandler from '@triumph/application/queries/maintenances/get-maintenance-by-identifier/get-maintenance-by-identifier.query-handler';
import GetMaintenanceByIdentifierUseCase from '@triumph/application/queries/maintenances/get-maintenance-by-identifier/get-maintenance-by-identifier.usecase';
import ListMaintenancesQueryHandler from '@triumph/application/queries/maintenances/list-maintenances/list-maintenances.query-handler';
import ListMaintenancesUseCase from '@triumph/application/queries/maintenances/list-maintenances/list-maintenances.usecase';

export const ListMaintenancesUseCaseProvider = {
  provide: ListMaintenancesUseCase,
  useFactory: (maintenanceRepositoryReader: MaintenanceRepositoryReader) => new ListMaintenancesQueryHandler(maintenanceRepositoryReader),
  inject: [MaintenanceRepositoryReader],
};

export const GetMaintenanceByIdentifierUseCaseProvider = {
  provide: GetMaintenanceByIdentifierUseCase,
  useFactory: (maintenanceRepositoryReader: MaintenanceRepositoryReader) => new GetMaintenanceByIdentifierQueryHandler(maintenanceRepositoryReader),
  inject: [MaintenanceRepositoryReader],
};

export const CreateMaintenanceUseCaseProvider = {
  provide: CreateMaintenanceUseCase,
  useFactory: (maintenanceRepositoryWriter: MaintenanceRepositoryWriter) => new CreateMaintenanceCommandHandler(maintenanceRepositoryWriter),
  inject: [MaintenanceRepositoryWriter],
};

export const UpdateMaintenanceUseCaseProvider = {
  provide: UpdateMaintenanceUseCase,
  useFactory: (maintenanceRepositoryWriter: MaintenanceRepositoryWriter) => new UpdateMaintenanceCommandHandler(maintenanceRepositoryWriter),
  inject: [MaintenanceRepositoryWriter],
};

export const DeleteMaintenanceUseCaseProvider = {
  provide: DeleteMaintenanceUseCase,
  useFactory: (maintenanceRepositoryWriter: MaintenanceRepositoryWriter) => new DeleteMaintenanceCommandHandler(maintenanceRepositoryWriter),
  inject: [MaintenanceRepositoryWriter],
};
