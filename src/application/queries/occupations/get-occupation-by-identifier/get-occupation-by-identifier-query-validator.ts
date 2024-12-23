import { InvalidQueryError } from '../../invalid-query-error';
import { QueryValidator } from '../../query-validator';
import GetOccupationByIdentifierQuery from './get-occupation-by-identifier-query';

export default class GetOccupationByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getOccupationByIdentifierQuery: GetOccupationByIdentifierQuery): void {
    const id = parseInt(getOccupationByIdentifierQuery.id);

    if (!id || isNaN(id) || id < 1) {
      throw new InvalidQueryError();
    }
  }
}
