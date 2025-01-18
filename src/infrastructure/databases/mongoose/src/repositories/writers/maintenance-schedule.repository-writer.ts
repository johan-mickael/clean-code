import { MaintenanceScheduleDTO } from '@triumph/application/interfaces/dtos/maintenance_schedules.dto';
import MaintenanceScheduleRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-schedule.repository-writer';
import { MaintenanceSchedule } from '@triumph/domain/entity/maintenance_schedules';

import MaintenanceScheduleModel from '../../models/maintenance-schedule.model';

export default class MongooseMaintenanceScheduleRepositoryWriter implements MaintenanceScheduleRepositoryWriter {
  async create(maintenanceScheduleDTO: MaintenanceScheduleDTO): Promise<MaintenanceSchedule> {
    console.log('maintenanceScheduleDTO', maintenanceScheduleDTO);

    const createdMaintenanceSchedule = await MaintenanceScheduleModel.create({
      label: maintenanceScheduleDTO.label,
      bike_model_id: maintenanceScheduleDTO.bikeModelId,
      month_interval: maintenanceScheduleDTO.monthInterval,
      mileage_interval: maintenanceScheduleDTO.mileageInterval,
    });

    const maintenanceScheduleEntity = new MaintenanceSchedule(
      createdMaintenanceSchedule.label,
      createdMaintenanceSchedule.bike_model_id,
      createdMaintenanceSchedule.month_interval,
      createdMaintenanceSchedule.mileage_interval,
    );

    maintenanceScheduleEntity.setId(createdMaintenanceSchedule._id);

    return maintenanceScheduleEntity;
  }
  update(id: string, entityDTO: MaintenanceScheduleDTO): Promise<MaintenanceSchedule> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
