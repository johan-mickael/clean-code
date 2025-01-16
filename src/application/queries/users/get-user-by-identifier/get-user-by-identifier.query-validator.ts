import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetUserByIdentifierQuery from './get-user-by-identifier.query';

export default class GetUserByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getUserByIdentifierQuery: GetUserByIdentifierQuery): void {
    const userId = getUserByIdentifierQuery.id.trim();

    if (!userId) {
      throw new InvalidQueryError();
    }
  }
}
