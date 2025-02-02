import { TriumphError } from '../triumph.error';

export class InvalidMaintenanceDateError extends TriumphError {
  constructor() {
    super('Invalid maintenance date');
    Object.setPrototypeOf(this, InvalidMaintenanceDateError.prototype);
  }
}
