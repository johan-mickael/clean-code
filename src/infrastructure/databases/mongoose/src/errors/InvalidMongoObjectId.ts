export default class InvalidMongoObjectId extends Error {
  constructor() {
    super('Invalid Mongo ObjectId');
  }
}