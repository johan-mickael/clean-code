export abstract class MaintenanceStatus {
  abstract get value(): number;
  abstract get label(): string;
}
