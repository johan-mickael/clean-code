import { FINISHED_MAINTENANCE, MaintenanceStatus } from './maintenance-status.interface';

export default class FinishedMaintenance implements MaintenanceStatus {
  get value(): number {
    return FINISHED_MAINTENANCE;
  }

  get label(): string {
    return 'finished';
  }
}
