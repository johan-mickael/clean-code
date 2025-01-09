export default class InvalidEntityError extends Error {
  constructor(message: string) {
    super(message ?? 'Invalid entity');
    Object.setPrototypeOf(this, InvalidEntityError.prototype);
  }
}
