import { TriumphError } from '../triumph.error';

export class MaintenanceDetailNotFoundError extends TriumphError {
  constructor() {
    super('Maintenance detail not found');
    Object.setPrototypeOf(this, MaintenanceDetailNotFoundError.prototype);
  }
}
