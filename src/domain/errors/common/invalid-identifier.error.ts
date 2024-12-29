export default class InvalidIdentifierError extends Error {
  constructor() {
    super('Invalid identifier provided');
    Object.setPrototypeOf(this, InvalidIdentifierError.prototype);
  }
}
