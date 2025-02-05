export const SCHEDULED_MAINTENANCE = 0;
export const IN_PROGRESS_MAINTENANCE = 1;
export const FINISHED_MAINTENANCE = 2;

export abstract class MaintenanceStatus {
  abstract get value(): number;
  abstract get label(): string;
}
