import CheckAllDueMaintenancesForBikesCommandHandler from '@triumph/application/commands/check-due-maintenances-for-bike-daily-task/check-all-due-maintenances-for-bikes.command-handler';
import CheckAllDueMaintenancesForBikesUsecase from '@triumph/application/commands/check-due-maintenances-for-bike-daily-task/check-all-due-maintenances-for-bikes.usecase';
import Logger from '@triumph/application/ports/logger/logger.interface';
import BusEmitter from '@triumph/application/ports/message-broker/bus-emitter.interface';
import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import MaintenanceRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-repository-reader';
import MaintenanceScheduleRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-schedule.repository-reader';
import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';
import Scheduler from '@triumph/application/ports/scheduler/scheduler.interface';
import CronScheduler from '@triumph/scheduler/src/cron';

export const SchedulerProvider = {
  provide: Scheduler,
  useClass: CronScheduler,
};

export const CheckAllDueMaintenancesForBikesUsecaseProvider = {
  provide: CheckAllDueMaintenancesForBikesUsecase,
  useFactory: (
    bikeRepositoryReader: BikeRepositoryReader,
    maintenanceScheduleRepositoryReader: MaintenanceScheduleRepositoryReader,
    maintenanceRepositoryReader: MaintenanceRepositoryReader,
    maintenanceRepositoryWriter: MaintenanceRepositoryWriter,
    scheduler: Scheduler,
    eventEmitter: BusEmitter,
    logger: Logger,
  ) =>
    new CheckAllDueMaintenancesForBikesCommandHandler(
      bikeRepositoryReader,
      maintenanceScheduleRepositoryReader,
      maintenanceRepositoryReader,
      maintenanceRepositoryWriter,
      scheduler,
      eventEmitter,
      logger,
    ),
  inject: [
    BikeRepositoryReader,
    MaintenanceScheduleRepositoryReader,
    MaintenanceRepositoryReader,
    MaintenanceRepositoryWriter,
    Scheduler,
    BusEmitter,
    Logger,
  ],
};
