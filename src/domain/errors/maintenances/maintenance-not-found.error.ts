import { TriumphError } from '../triumph.error';

export class MaintenanceNotFoundError extends TriumphError {
  constructor() {
    super('Maintenance not found');
    Object.setPrototypeOf(this, MaintenanceNotFoundError.prototype);
  }
}
