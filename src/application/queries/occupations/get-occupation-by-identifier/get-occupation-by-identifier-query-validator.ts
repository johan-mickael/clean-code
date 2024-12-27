import { InvalidQueryError } from '../../invalid-query-error';
import { QueryValidator } from '../../query-validator';
import GetOccupationByIdentifierQuery from './get-occupation-by-identifier-query';

export default class GetOccupationByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getOccupationByIdentifierQuery: GetOccupationByIdentifierQuery): void {
    const id = getOccupationByIdentifierQuery.id;

    if (!id) {
      throw new InvalidQueryError();
    }
  }
}
