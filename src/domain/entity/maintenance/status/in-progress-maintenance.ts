import { IN_PROGRESS_MAINTENANCE, MaintenanceStatus } from './maintenance-status.interface';

export default class InProgressMaintenance implements MaintenanceStatus {
  get value(): number {
    return IN_PROGRESS_MAINTENANCE;
  }

  get label(): string {
    return 'in progress';
  }
}
