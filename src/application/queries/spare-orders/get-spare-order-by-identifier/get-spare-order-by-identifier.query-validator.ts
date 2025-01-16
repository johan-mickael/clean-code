import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetSpareOrderByIdentifierQuery from './get-spare-order-by-identifier.query';

export default class GetSpareOrderByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getSpareOrderByIdentifierQuery: GetSpareOrderByIdentifierQuery): void {
    const spareOrderId = getSpareOrderByIdentifierQuery.id.trim();

    if (!spareOrderId) {
      throw new InvalidQueryError();
    }
  }
}
