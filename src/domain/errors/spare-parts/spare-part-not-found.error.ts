import { TriumphError } from '../triumph.error';

export class SparePartNotFoundError extends TriumphError {
  constructor() {
    super('Spare part not found');
    Object.setPrototypeOf(this, SparePartNotFoundError.prototype);
  }
}
