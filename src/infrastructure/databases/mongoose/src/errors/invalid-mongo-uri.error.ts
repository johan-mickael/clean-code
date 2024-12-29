export default class InvalidMongoUriError extends Error {
  constructor() {
    super('Invalid MONGO_URI');
  }
}
