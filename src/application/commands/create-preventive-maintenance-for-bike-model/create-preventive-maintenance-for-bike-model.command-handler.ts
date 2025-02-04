import { MaintenanceSchedule } from '@triumph/domain/entity/maintenance_schedules';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found.error';
import MaintenanceScheduleCreatedEvent from '@triumph/domain/events/maintenances/maintenance-schedule-created.event';

import { MaintenanceScheduleDTO } from '../../interfaces/dtos/maintenance_schedules.dto';
import MaintenanceScheduleDTOMapper from '../../interfaces/mappers/maintenance-schedule.dto-mapper';
import BusEmitter from '../../ports/message-broker/bus-emitter.interface';
import BikeModelRepositoryReader from '../../ports/repositories/readers/bike-model.repository-reader';
import MaintenanceScheduleRepositoryWriter from '../../ports/repositories/writers/maintenance-schedule.repository-writer';
import { InvalidCommandError } from '../common/invalid-command.error';
import CreatePreventiveMaintenanceForBikeModelCommand from './create-preventive-maintenance-for-bike-model.command';
import CreatePreventiveMaintenanceForBikeModelUseCase from './create-preventive-maintenance-for-bike-model.usecase';

export default class CreatePreventiveMaintenanceForBikeModelCommandHandler
  implements CreatePreventiveMaintenanceForBikeModelUseCase
{
  constructor(
    private readonly maintenanceScheduleRepositoryWriter: MaintenanceScheduleRepositoryWriter,
    private readonly bikeModelRepositoryReader: BikeModelRepositoryReader,
    private readonly eventEmitter: BusEmitter,
  ) {}

  async execute(
    createPreventiveMaintenanceForBikeModelCommand: CreatePreventiveMaintenanceForBikeModelCommand,
  ): Promise<MaintenanceScheduleDTO> {
    const maintenanceScheduleEntity = new MaintenanceSchedule(
      createPreventiveMaintenanceForBikeModelCommand.maintenanceScheduleLabel,
      createPreventiveMaintenanceForBikeModelCommand.bikeModelId,
    );

    try {
      if (createPreventiveMaintenanceForBikeModelCommand.monthInterval) {
        maintenanceScheduleEntity.monthInterval = createPreventiveMaintenanceForBikeModelCommand.monthInterval;
      }

      if (createPreventiveMaintenanceForBikeModelCommand.mileageInterval) {
        maintenanceScheduleEntity.mileageInterval = createPreventiveMaintenanceForBikeModelCommand.mileageInterval;
      }

      maintenanceScheduleEntity.validate();
    } catch (error: unknown) {
      throw new InvalidCommandError(createPreventiveMaintenanceForBikeModelCommand);
    }

    const bikeModel = await this.bikeModelRepositoryReader.getById(
      createPreventiveMaintenanceForBikeModelCommand.bikeModelId,
    );

    if (!bikeModel) {
      throw new BikeModelNotFoundError();
    }

    const maintenanceScheduleDTO = MaintenanceScheduleDTOMapper.toDTO(maintenanceScheduleEntity);

    const createdMaintenanceScheduleEntity =
      await this.maintenanceScheduleRepositoryWriter.create(maintenanceScheduleDTO);

    const maintenanceScheduleCreatedEvent = new MaintenanceScheduleCreatedEvent().setPayload(
      createdMaintenanceScheduleEntity,
    );
    this.eventEmitter.emit(maintenanceScheduleCreatedEvent);

    return MaintenanceScheduleDTOMapper.toDTO(createdMaintenanceScheduleEntity);
  }
}
