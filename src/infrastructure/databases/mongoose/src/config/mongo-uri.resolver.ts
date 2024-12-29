import InvalidMongoUriError from '../errors/invalid-mongo-uri.error';

export default class MongoUriResolver {
  static resolve(): string {
    if (process.env.MONGO_URI) {
      return process.env.MONGO_URI;
    }

    throw new InvalidMongoUriError();
  }
}
