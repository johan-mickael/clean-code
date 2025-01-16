import { TriumphError } from '../triumph.error';

export class DrivingHistoryNotFoundError extends TriumphError {
  constructor() {
    super('Driving history not found');
    Object.setPrototypeOf(this, DrivingHistoryNotFoundError.prototype);
  }
}
