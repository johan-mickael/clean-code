import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetBikeByIdentifierQuery from './get-bike-by-identifier.query';

export default class GetBikeByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getBikeByIdentifierQuery: GetBikeByIdentifierQuery): void {
    const bikeId = getBikeByIdentifierQuery.id.trim();

    if (!bikeId) {
      throw new InvalidQueryError();
    }
  }
}
