import MaintenanceScheduleRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-schedule.repository-reader';
import { MaintenanceSchedule } from '@triumph/domain/entity/maintenance_schedules';

import MaintenanceScheduleModel from '../../models/maintenance-schedule.model';

export default class MongooseMaintenanceScheduleRepositoryReader implements MaintenanceScheduleRepositoryReader {
  async getForBikeModel(bikeModelId: string): Promise<MaintenanceSchedule | null> {
    const maintenanceSchedule = await MaintenanceScheduleModel.findOne({
      bike_model_id: bikeModelId,
    });

    if (!maintenanceSchedule) {
      return null;
    }

    const maintenanceScheduleEntity = new MaintenanceSchedule(
      maintenanceSchedule.label,
      maintenanceSchedule.bike_model_id,
      maintenanceSchedule.month_interval,
      maintenanceSchedule.mileage_interval,
    );

    return maintenanceScheduleEntity;
  }
  list(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<MaintenanceSchedule | null> {
    throw new Error('Method not implemented.');
  }
}
