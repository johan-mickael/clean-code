import { MaintenanceSchedule } from '@triumph/domain/entity/maintenance_schedules';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';



import { MaintenanceScheduleDTO } from '../dtos/maintenance_schedules.dto';





export default class MaintenanceScheduleDTOMapper {
  static toDTO(maintenanceScheduleEntity: MaintenanceSchedule): MaintenanceScheduleDTO {
    return new MaintenanceScheduleDTO(
      maintenanceScheduleEntity.label,
      maintenanceScheduleEntity.bikeModelId,
      maintenanceScheduleEntity.monthInterval,
      maintenanceScheduleEntity.mileageInterval,
      maintenanceScheduleEntity.id,
    );
  }

  static toEntity(maintenanceScheduleDTO: MaintenanceScheduleDTO): MaintenanceSchedule {
    const { id, label, bikeModelId, monthInterval, mileageInterval } = maintenanceScheduleDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    const maintenanceScheduleEntity = new MaintenanceSchedule(label, bikeModelId, monthInterval, mileageInterval);
    maintenanceScheduleEntity.setId(id);

    return maintenanceScheduleEntity;
  }
}