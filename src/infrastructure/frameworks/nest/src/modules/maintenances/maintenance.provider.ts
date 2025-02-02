import CreateCurativeMaintenanceForBikeCommandHandler from '@triumph/application/commands/create-curative-maintenance-for-bike/create-curative-maintenance-for-bike.command-handler';
import CreateCurativeMaintenanceForBikeUseCase from '@triumph/application/commands/create-curative-maintenance-for-bike/create-curative-maintenance-for-bike.usecase';
import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';

export const CreateCurativeMaintenanceForBikeUseCaseProvider = {
  provide: CreateCurativeMaintenanceForBikeUseCase,
  useFactory: (bikeRepositoryReader: BikeRepositoryReader, maintenanceRepositoryWriter: MaintenanceRepositoryWriter) =>
    new CreateCurativeMaintenanceForBikeCommandHandler(bikeRepositoryReader, maintenanceRepositoryWriter),
  inject: [BikeRepositoryReader, MaintenanceRepositoryWriter],
};
