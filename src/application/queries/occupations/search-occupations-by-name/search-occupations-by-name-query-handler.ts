import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import SearchOccupationsByNameQuery from './search-occupation-by-name-query';

export default class SearchOccupationsByNameQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) { }

  async execute(query: SearchOccupationsByNameQuery): Promise<Occupation[]> {
    return this.occupationRepository.searchByName(query.name);
  }
}
