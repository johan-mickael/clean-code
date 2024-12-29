import { TriumphError } from '../triumph.error';

export class BikeNotFoundError extends TriumphError {
  constructor() {
    super('Bike not found');
    Object.setPrototypeOf(this, BikeNotFoundError.prototype);
  }
}
