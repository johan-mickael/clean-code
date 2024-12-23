export class InvalidQueryError extends Error {
  constructor() {
    super('Invalid query');
    Object.setPrototypeOf(this, InvalidQueryError.prototype);
  }
}
