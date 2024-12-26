import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import SearchOccupationsByNameQuery from './search-occupations-by-name-query';
import SearchOccupationsByNameQueryValidator from './search-occupations-by-name-query-validator';
import OccupationDTOMapper from '../../../dto-mappers/occupation-dto-mapper';
import OccupationDTO from '../../../dto-mappers/occupation-dto';

export default class SearchOccupationsByNameQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) {}

  async execute(query: SearchOccupationsByNameQuery): Promise<OccupationDTO[]> {
    new SearchOccupationsByNameQueryValidator().validateQuery(query);

    const foundOccupations = await this.occupationRepository.searchByName(query.name);

    return foundOccupations.map(OccupationDTOMapper.toDTO);
  }
}
