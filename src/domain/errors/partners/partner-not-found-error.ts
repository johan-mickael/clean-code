import { TriumphError } from '../triumph-error';

export class PartnerNotFoundError extends TriumphError {
  constructor() {
    super('Partner not found');
    Object.setPrototypeOf(this, PartnerNotFoundError.prototype);
  }
}
