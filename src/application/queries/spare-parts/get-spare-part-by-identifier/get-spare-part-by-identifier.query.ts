import { Query } from '../../common/query';

export default class GetSparePartByIdQuery implements Query {
  constructor(private readonly _id: string) {}

  get id(): string {
    return this._id;
  }
}
