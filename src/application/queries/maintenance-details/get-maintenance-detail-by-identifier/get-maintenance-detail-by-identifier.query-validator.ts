import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetMaintenanceDetailByIdentifierQuery from './get-maintenance-detail-by-identifier.query';

export default class GetMaintenanceDetailByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getMaintenanceDetailByIdentifierQuery: GetMaintenanceDetailByIdentifierQuery): void {
    const detailId = getMaintenanceDetailByIdentifierQuery.id.trim();

    if (!detailId) {
      throw new InvalidQueryError();
    }
  }
}
