import { TriumphError } from '../triumph-error';

export class BikeModelNotFoundError extends TriumphError {
  constructor() {
    super('Bike model not found');
    Object.setPrototypeOf(this, BikeModelNotFoundError.prototype);
  }
}
