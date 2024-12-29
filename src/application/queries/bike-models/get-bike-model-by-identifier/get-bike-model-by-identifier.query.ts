import { Query } from '../../common/query';

export default class GetBikeModelByIdentifierQuery implements Query {
  constructor(private readonly _id: string) {}

  get id(): string {
    return this._id;
  }
}
