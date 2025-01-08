import CreatePreventiveMaintenanceForBikeModelCommandHandler from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.command-handler';
import CreatePreventiveMaintenanceForBikeModelUseCase from '@triumph/application/commands/create-preventive-maintenance-for-bike-model/create-preventive-maintenance-for-bike-model.usecase';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/readers/bike-model.repository-reader';
import MaintenanceScheduleRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-schedule.repository-writer';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike-model.repository-reader';

import MongooseMaintenanceScheduleRepositoryWriter from '../../../../../databases/mongoose/src/repositories/writers/maintenance-schedule.repository-writer';

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
  ) =>
    new CreatePreventiveMaintenanceForBikeModelCommandHandler(
      maintenanceScheduleRepositoryWriter,
      bikeModelRepositoryReader,
    ),
  inject: [MaintenanceScheduleRepositoryWriter, BikeModelRepositoryReader],
};
