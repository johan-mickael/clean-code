import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationRepositoryReader from '../../../ports/repositories/occupation-repository-reader';
import GetOccupationByIdentifierQuery from './get-occupation-by-identifier-query';
import { OccupationNotFoundError } from '@triumph/domain/errors/occupations/occupation-not-found-error';
import GetOccupationByIdentifierQueryValidator from './get-occupation-by-identifier-query-validator';

export default class GetOccupationByIdentifierQueryHandler {
  constructor(private readonly occupationRepository: OccupationRepositoryReader) {}

  /**
   * @throws {
   *  InvalidQueryError,
   *  OccupationNotFoundError,
   * }
   */
  async execute(getOccupationByIdentifierQuery: GetOccupationByIdentifierQuery): Promise<Occupation> {
    new GetOccupationByIdentifierQueryValidator().validateQuery(getOccupationByIdentifierQuery);

    const foundOccupation = await this.occupationRepository.getById(getOccupationByIdentifierQuery.id);

    if (foundOccupation !== null) {
      return foundOccupation;
    }

    throw new OccupationNotFoundError();
  }
}
