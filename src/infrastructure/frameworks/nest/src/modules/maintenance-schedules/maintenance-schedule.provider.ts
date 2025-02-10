import CreatePreventiveMaintenanceForBikeModelCommandHandler from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.command-handler';
import CreatePreventiveMaintenanceForBikeModelUseCase from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.usecase';
import BusEmitter from '@triumph/application/ports/message-broker/bus-emitter.interface';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/readers/bike-model.repository-reader';
import MaintenanceScheduleRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-schedule.repository-reader';
import MaintenanceScheduleRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-schedule.repository-writer';
import MongooseMaintenanceScheduleRepositoryReader from '@triumph/mongoose-adapter/src/repositories/readers/maintenance-schedule.repository-reader';
import MongooseMaintenanceScheduleRepositoryWriter from '@triumph/mongoose-adapter/src/repositories/writers/maintenance-schedule.repository-writer';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike-model.repository-reader';

export const MaintenanceScheduleRepositoryReaderProvider = {
  provide: MaintenanceScheduleRepositoryReader,
  useClass: MongooseMaintenanceScheduleRepositoryReader,
};

export const MaintenanceScheduleRepositoryWriterProvider = {
  provide: MaintenanceScheduleRepositoryWriter,
  useClass: MongooseMaintenanceScheduleRepositoryWriter,
};

export const BikeModelRepositoryReaderProvider = {
  provide: BikeModelRepositoryReader,
  useClass: SequelizeBikeModelRepositoryReader,
};

export const CreatePreventiveMaintenanceScheduleForBikeModelUseCaseProvider = {
  provide: CreatePreventiveMaintenanceForBikeModelUseCase,
  useFactory: (
    maintenanceScheduleRepositoryWriter: MaintenanceScheduleRepositoryWriter,
    bikeModelRepositoryReader: BikeModelRepositoryReader,
    busEmitter: BusEmitter,
  ) =>
    new CreatePreventiveMaintenanceForBikeModelCommandHandler(
      maintenanceScheduleRepositoryWriter,
      bikeModelRepositoryReader,
      busEmitter,
    ),
  inject: [MaintenanceScheduleRepositoryWriter, BikeModelRepositoryReader, BusEmitter],
};
