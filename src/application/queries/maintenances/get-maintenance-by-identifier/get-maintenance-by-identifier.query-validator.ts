import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetMaintenanceByIdentifierQuery from './get-maintenance-by-identifier.query';

export default class GetMaintenanceByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getMaintenanceByIdentifierQuery: GetMaintenanceByIdentifierQuery): void {
    const maintenanceId = getMaintenanceByIdentifierQuery.id.trim();

    if (!maintenanceId) {
      throw new InvalidQueryError();
    }
  }
}

