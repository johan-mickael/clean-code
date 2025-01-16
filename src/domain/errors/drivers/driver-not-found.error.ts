import { TriumphError } from '../triumph.error';

export class DriverNotFoundError extends TriumphError {
  constructor() {
    super('Driver not found');
    Object.setPrototypeOf(this, DriverNotFoundError.prototype);
  }
}
