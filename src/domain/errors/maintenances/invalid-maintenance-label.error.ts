import { TriumphError } from '../triumph.error';

export class InvalidMaintenanceLabelError extends TriumphError {
  constructor() {
    super('Invalid maintenance label');
    Object.setPrototypeOf(this, InvalidMaintenanceLabelError.prototype);
  }
}
