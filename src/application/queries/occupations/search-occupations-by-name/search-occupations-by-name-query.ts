import { Query } from '../../common/query';

export default class SearchOccupationsByNameQuery implements Query {
  constructor(private readonly _name: string) {}

  get name(): string {
    return this._name;
  }
}
