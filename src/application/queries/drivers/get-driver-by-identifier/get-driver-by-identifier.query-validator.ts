import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetDriverByIdentifierQuery from './get-driver-by-identifier.query';

export default class GetDriverByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getDriverByIdentifierQuery: GetDriverByIdentifierQuery): void {
    const driverId = getDriverByIdentifierQuery.id.trim();

    if (!driverId) {
      throw new InvalidQueryError();
    }
  }
}
