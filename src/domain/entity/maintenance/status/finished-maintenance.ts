import { MaintenanceStatus } from './maintenance-status.interface';

export default class FinishedMaintenance implements MaintenanceStatus {
  get value(): number {
    return 2;
  }

  get label(): string {
    return 'finished';
  }
}
