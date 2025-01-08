import { MaintenanceSchedule } from '@triumph/domain/entity/maintenance_schedules';

import { MaintenanceScheduleDTO } from '../../../interfaces/dtos/maintenance_schedules.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class MaintenanceScheduleRepositoryWriter extends BaseRepositoryWriter<
  MaintenanceSchedule,
  MaintenanceScheduleDTO
> {}
