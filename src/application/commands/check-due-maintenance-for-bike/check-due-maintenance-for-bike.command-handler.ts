import Bike from '@triumph/domain/entity/bike';
import Maintenance from '@triumph/domain/entity/maintenance/maintenance';
import ScheduledMaintenance from '@triumph/domain/entity/maintenance/status/scheduled-maintenance';
import { MaintenanceSchedule } from '@triumph/domain/entity/maintenance_schedules';
import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';
import InvalidEntityError from '@triumph/domain/errors/common/invalid-entity.error';
import ScheduledMaintenanceForBikeCreatedEvent from '@triumph/domain/events/maintenances/scheduled-maintenance-for-bike-created.event';

import Logger from '../../ports/logger/logger.interface';
import BusEmitter from '../../ports/message-broker/bus-emitter.interface';
import BikeRepositoryReader from '../../ports/repositories/readers/bike-repository-reader';
import MaintenanceRepositoryReader from '../../ports/repositories/readers/maintenance-repository-reader';
import MaintenanceScheduleRepositoryReader from '../../ports/repositories/readers/maintenance-schedule.repository-reader';
import MaintenanceRepositoryWriter from '../../ports/repositories/writers/maintenance-repository-writer';
import CheckDueMaintenanceForBike from './check-due-maintenance-for-bike.command';
import CheckDueMaintenanceForBikeUseCase from './check-due-maintenance-for-bike.usecase';

export default class CheckDueMaintenanceForBikeCommandhandler implements CheckDueMaintenanceForBikeUseCase {
  private EXCEDEED_MILEAGE_MAINTENANCE_LABEL = 'Maintenance par dépassement de kilométrage';
  private EXCEDEED_TIME_MAINTENANCE_LABEL = 'Maintenance par dépassement de temps';

  constructor(
    private readonly bikeRepositoryReader: BikeRepositoryReader,
    private readonly maintenanceScheduleRepositoryReader: MaintenanceScheduleRepositoryReader,
    private readonly maintenanceRepositoryReader: MaintenanceRepositoryReader,
    private readonly maintenanceRepositoryWriter: MaintenanceRepositoryWriter,
    private readonly eventEmitter: BusEmitter,
    private readonly logger: Logger,
  ) {}

  async execute(generateMaintenanceForBikeCommand: CheckDueMaintenanceForBike): Promise<Maintenance | undefined> {
    const { bikeId } = generateMaintenanceForBikeCommand;

    const bike = await this.bikeRepositoryReader.getById(bikeId);

    if (!bike) {
      throw new BikeNotFoundError();
    }

    const currentMaintenanceScheduleForBike = await this.maintenanceScheduleRepositoryReader.getForBikeModel(
      bike.bikeModelId,
    );

    if (!currentMaintenanceScheduleForBike) {
      // Nothing to generate because there is no maintenance schedule configuration for this bike model
      this.logger.info('No maintenance schedule configuration found for bike model.', bike);
      return;
    }

    const currentMaintenanceForBike = await this.maintenanceRepositoryReader.getLastScheduledMaintenanceForBike(bikeId);
    if (currentMaintenanceForBike) {
      this.logger.info('Scheduled maintenance already generated for bike.', bike);
      return;
    }

    await this.insertOrIgnoreMaintenanceForBike(bike, currentMaintenanceScheduleForBike);
    return;
  }

  private async insertOrIgnoreMaintenanceForBike(
    bike: Bike,
    currentMaintenanceScheduleForBike: MaintenanceSchedule,
  ): Promise<void> {
    // Ignore insertion if bike does not need maintenance
    if (
      !this.isBikeNeedsMaintenanceBasedOnMileage(bike, currentMaintenanceScheduleForBike) &&
      !this.isBikeNeedsMaintenanceBasedOnTime(bike, currentMaintenanceScheduleForBike)
    ) {
      return;
    }

    const newMaintenance = new Maintenance('', bike.id, new ScheduledMaintenance());
    if (this.isBikeNeedsMaintenanceBasedOnMileage(bike, currentMaintenanceScheduleForBike)) {
      newMaintenance.label = this.EXCEDEED_MILEAGE_MAINTENANCE_LABEL;
    }
    if (this.isBikeNeedsMaintenanceBasedOnTime(bike, currentMaintenanceScheduleForBike)) {
      newMaintenance.label = this.EXCEDEED_TIME_MAINTENANCE_LABEL;
    }

    this.saveMaintenance(newMaintenance);
    this.eventEmitter.emit(new ScheduledMaintenanceForBikeCreatedEvent().setPayload(newMaintenance));

    return;
  }

  private async saveMaintenance(newMaintenance: Maintenance): Promise<void> {
    try {
      newMaintenance.validate();
      await this.maintenanceRepositoryWriter.create({
        maintenanceLabel: newMaintenance.label,
        bikeId: newMaintenance.bikeId,
        status: newMaintenance.status.value,
        maintenanceDate: newMaintenance.maintenanceDate,
      });
    } catch (error: unknown) {
      this.logger.error('Error while saving maintenance', error);
      throw new InvalidEntityError('Invalid maintenance entity');
    }
  }

  private isBikeNeedsMaintenanceBasedOnMileage(bike: Bike, maintenanceSchedule: MaintenanceSchedule): boolean {
    if (!maintenanceSchedule.mileageInterval) {
      return false;
    }

    const lastFinishedMaintenance = this.maintenanceRepositoryReader.getLastFinishedMaintenanceForBike(bike.id);
    if (!lastFinishedMaintenance) {
      return bike.mileage >= maintenanceSchedule.mileageInterval;
    }

    return bike.mileage >= maintenanceSchedule.mileageInterval;
  }

  private isBikeNeedsMaintenanceBasedOnTime(bike: Bike, maintenanceSchedule: MaintenanceSchedule): boolean {
    if (!maintenanceSchedule.monthInterval) {
      return false;
    }

    const bikeCirculationDate = bike.circulationDate;
    const currentDate = new Date();

    // Diff months between bike circulation date and current date
    const bikeCirculationMonths =
      (currentDate.getFullYear() - bikeCirculationDate.getFullYear()) * 12 +
      currentDate.getMonth() -
      bikeCirculationDate.getMonth();

    return bikeCirculationMonths >= maintenanceSchedule.monthInterval;
  }
}
