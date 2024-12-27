import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import GetOccupationByIdentifierQuery from './get-occupation-by-identifier-query';
import { OccupationNotFoundError } from '@triumph/domain/errors/occupations/occupation-not-found-error';
import GetOccupationByIdentifierQueryValidator from './get-occupation-by-identifier-query-validator';
import OccupationDTO from '../../../interfaces/dtos/occupation-dto';
import OccupationDTOMapper from '../../../interfaces/mappers/occupation-dto-mapper';

export default class GetOccupationByIdentifierQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) {}

  /**
   * @throws {
   *  InvalidQueryError,
   *  OccupationNotFoundError,
   * }
   */
  async execute(getOccupationByIdentifierQuery: GetOccupationByIdentifierQuery): Promise<OccupationDTO> {
    new GetOccupationByIdentifierQueryValidator().validateQuery(getOccupationByIdentifierQuery);

    const foundOccupation = await this.occupationRepository.getById(getOccupationByIdentifierQuery.id);

    if (foundOccupation !== null) {
      return OccupationDTOMapper.toDTO(foundOccupation);
    }

    throw new OccupationNotFoundError();
  }
}
