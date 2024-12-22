import InvalidMongoUriError from '../errors/InvalidMongoUriError';

export default class MongoUriResolver {
  static resolve(): string {
    if (process.env.MONGO_URI) {
      return process.env.MONGO_URI;
    }

    throw new InvalidMongoUriError();
  }
}
