import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetBikeModelByIdentifierQuery from './get-bike-model-by-identifier.query';

export default class GetBikeModelByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getBikeModelByIdentifierQuery: GetBikeModelByIdentifierQuery): void {
    const bikeModelId = getBikeModelByIdentifierQuery.id;

    if (!bikeModelId) {
      throw new InvalidQueryError();
    }
  }
}
