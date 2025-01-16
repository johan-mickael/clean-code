import { TriumphError } from '../triumph.error';

export class UserNotFoundError extends TriumphError {
  constructor() {
    super('User not found');
    Object.setPrototypeOf(this, UserNotFoundError.prototype);
  }
}
