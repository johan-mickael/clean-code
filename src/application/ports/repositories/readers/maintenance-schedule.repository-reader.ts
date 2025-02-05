import { MaintenanceSchedule } from '@triumph/domain/entity/maintenance_schedules';

import BaseRepositoryReader from './base.repository-reader';

export default abstract class MaintenanceScheduleRepositoryReader extends BaseRepositoryReader<MaintenanceSchedule> {
  abstract getForBikeModel(bikeModelId: string): Promise<MaintenanceSchedule | null>;
}
