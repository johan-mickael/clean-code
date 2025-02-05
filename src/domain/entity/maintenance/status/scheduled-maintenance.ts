import { MaintenanceStatus, SCHEDULED_MAINTENANCE } from './maintenance-status.interface';

export default class ScheduledMaintenance implements MaintenanceStatus {
  get value(): number {
    return SCHEDULED_MAINTENANCE;
  }

  get label(): string {
    return 'scheduled';
  }
}
