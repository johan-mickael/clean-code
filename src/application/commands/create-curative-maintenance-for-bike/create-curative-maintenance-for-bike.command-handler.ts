import Maintenance from '@triumph/domain/entity/maintenance/maintenance';
import ScheduledMaintenance from '@triumph/domain/entity/maintenance/status/scheduled-maintenance';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';
import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';
import { InvalidMaintenanceDateError } from '@triumph/domain/errors/maintenances/invalid-maintenance-date.error';

import BikeRepositoryReader from '../../ports/repositories/readers/bike-repository-reader';
import MaintenanceRepositoryWriter from '../../ports/repositories/writers/maintenance-repository-writer';
import { InvalidCommandError } from '../common/invalid-command.error';
import CreateCurativeMaintenanceForBikeCommand from './create-curative-maintenance-for-bike.command';
import CreateCurativeMaintenanceForBikeUseCase from './create-curative-maintenance-for-bike.usecase';

export default class CreateCurativeMaintenanceForBikeCommandHandler implements CreateCurativeMaintenanceForBikeUseCase {
  constructor(
    private readonly bikeRepositoryReader: BikeRepositoryReader,
    private readonly maintenanceRepositoryWriter: MaintenanceRepositoryWriter,
  ) {}

  async execute(
    createCurativeMaintenanceForBikeCommand: CreateCurativeMaintenanceForBikeCommand,
  ): Promise<Maintenance> {
    const maintenanceEntity = new Maintenance(
      createCurativeMaintenanceForBikeCommand.maintenanceScheduleLabel,
      createCurativeMaintenanceForBikeCommand.bikeModelId,
      new Date(createCurativeMaintenanceForBikeCommand.maintenanceDate),
      new ScheduledMaintenance(),
    );

    try {
      maintenanceEntity.validate();
    } catch (error: unknown) {
      throw new InvalidCommandError(createCurativeMaintenanceForBikeCommand);
    }

    const bike = await this.bikeRepositoryReader.getById(createCurativeMaintenanceForBikeCommand.bikeModelId);

    if (!bike) {
      throw new BikeNotFoundError();
    }

    const createdMaintenanceEntity = await this.maintenanceRepositoryWriter.create({
      maintenanceLabel: maintenanceEntity.label,
      bikeId: maintenanceEntity.bikeId,
      maintenanceDate: maintenanceEntity.maintenanceDate,
      status: maintenanceEntity.status.value,
    });

    return createdMaintenanceEntity;
  }
}
