import CreateCurativeMaintenanceForBikeCommandHandler from '@triumph/application/commands/create-curative-maintenance-for-bike/create-curative-maintenance-for-bike.command-handler';
import CreateCurativeMaintenanceForBikeUseCase from '@triumph/application/commands/create-curative-maintenance-for-bike/create-curative-maintenance-for-bike.usecase';
import BusEmitter from '@triumph/application/ports/message-broker/bus-emitter.interface';
import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';

export const CreateCurativeMaintenanceForBikeUseCaseProvider = {
  provide: CreateCurativeMaintenanceForBikeUseCase,
  useFactory: (
    bikeRepositoryReader: BikeRepositoryReader,
    maintenanceRepositoryWriter: MaintenanceRepositoryWriter,
    eventEmitter: BusEmitter,
  ) =>
    new CreateCurativeMaintenanceForBikeCommandHandler(bikeRepositoryReader, maintenanceRepositoryWriter, eventEmitter),
  inject: [BikeRepositoryReader, MaintenanceRepositoryWriter, BusEmitter],
};
