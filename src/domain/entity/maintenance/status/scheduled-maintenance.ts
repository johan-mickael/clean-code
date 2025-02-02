import { MaintenanceStatus } from './maintenance-status.interface';

export default class ScheduledMaintenance implements MaintenanceStatus {
  get value(): number {
    return 0;
  }

  get label(): string {
    return 'scheduled';
  }
}
