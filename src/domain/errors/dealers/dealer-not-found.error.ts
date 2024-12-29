import { TriumphError } from '../triumph.error';

export class DealerNotFoundError extends TriumphError {
  constructor() {
    super('Dealer not found');
    Object.setPrototypeOf(this, DealerNotFoundError.prototype);
  }
}
