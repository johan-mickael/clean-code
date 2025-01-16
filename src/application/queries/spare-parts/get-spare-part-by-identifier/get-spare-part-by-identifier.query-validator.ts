import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetSparePartByIdentifierQuery from './get-spare-part-by-identifier.query';

export default class GetSparePartByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getSparePartByIdentifierQuery: GetSparePartByIdentifierQuery): void {
    const sparePartId = getSparePartByIdentifierQuery.id.trim();

    if (!sparePartId) {
      throw new InvalidQueryError();
    }
  }
}
