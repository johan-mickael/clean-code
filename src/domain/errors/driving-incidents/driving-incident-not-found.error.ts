import { TriumphError } from '../triumph.error';

export class DrivingIncidentNotFoundError extends TriumphError {
  constructor() {
    super('Driving incident not found');
    Object.setPrototypeOf(this, DrivingIncidentNotFoundError.prototype);
  }
}
