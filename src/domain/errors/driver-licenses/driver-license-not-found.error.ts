import { TriumphError } from '../triumph.error';

export class DriverLicenseNotFoundError extends TriumphError {
  constructor() {
    super('Driver license not found');
    Object.setPrototypeOf(this, DriverLicenseNotFoundError.prototype);
  }
}
