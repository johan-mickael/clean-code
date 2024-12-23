import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import SearchOccupationsByNameQuery from './search-occupations-by-name-query';
import SearchOccupationsByNameQueryValidator from './search-occupations-by-name-query-validator';

export default class SearchOccupationsByNameQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) {}

  async execute(query: SearchOccupationsByNameQuery): Promise<Occupation[]> {
    new SearchOccupationsByNameQueryValidator().validateQuery(query);

    return this.occupationRepository.searchByName(query.name);
  }
}
