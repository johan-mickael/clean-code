import { InvalidQueryError } from '../../common/invalid-query-error';
import { QueryValidator } from '../../common/query-validator';
import GetPartnerByIdentifierQuery from './get-partner-by-identifier-query';

export default class GetPartnerByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getPartnerByIdentifierQuery: GetPartnerByIdentifierQuery): void {
    const partnerId = getPartnerByIdentifierQuery.id;

    if (!partnerId) {
      throw new InvalidQueryError();
    }
  }
}
