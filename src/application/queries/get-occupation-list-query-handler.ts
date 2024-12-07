import OccupationRepositoryReader from '../ports/repositories/occupation-repository-reader';
import GetOccupationListQuery from './get-occupation-list-query';
import { Occupation } from '@triumph/domain/entity/occupation';

export default class GetOccupationListQueryHandler {
  constructor(private readonly occupationRepositoryReader: OccupationRepositoryReader) {}

  execute(query: GetOccupationListQuery): Occupation[] {
    return this.occupationRepositoryReader.list();
  }
}
