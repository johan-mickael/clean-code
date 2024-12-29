export default class InvalidDatabaseAdapterError extends Error {
  constructor() {
    super('Database adapter not supported');
  }
}
