import FinishedMaintenance from './finished-maintenance';
import InProgressMaintenance from './in-progress-maintenance';
import { IN_PROGRESS_MAINTENANCE, MaintenanceStatus, SCHEDULED_MAINTENANCE } from './maintenance-status.interface';
import ScheduledMaintenance from './scheduled-maintenance';

export class MaintenanceStatusFactory {
  static create(value: number): MaintenanceStatus {
    if (value === SCHEDULED_MAINTENANCE) {
      return new ScheduledMaintenance();
    }
    if (value === IN_PROGRESS_MAINTENANCE) {
      return new InProgressMaintenance();
    }

    return new FinishedMaintenance();
  }
}
