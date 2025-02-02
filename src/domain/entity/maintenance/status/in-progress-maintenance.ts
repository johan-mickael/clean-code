import { MaintenanceStatus } from './maintenance-status.interface';

export default class InProgressMaintenance implements MaintenanceStatus {
  get value(): number {
    return 1;
  }

  get label(): string {
    return 'in progress';
  }
}
