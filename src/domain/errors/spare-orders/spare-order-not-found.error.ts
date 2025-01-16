import { TriumphError } from '../triumph.error';

export class SpareOrderNotFoundError extends TriumphError {
  constructor() {
    super('Spare order not found');
    Object.setPrototypeOf(this, SpareOrderNotFoundError.prototype);
  }
}
