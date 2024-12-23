import { TriumphError } from '../triumph-error';

export class OccupationNotFoundError extends TriumphError {
  constructor() {
    super('Occupation not found');
    Object.setPrototypeOf(this, OccupationNotFoundError.prototype);
  }
}
