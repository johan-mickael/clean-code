import { QueryValidator } from '../../common/query-validator';
import ListMaintenanceDetailsQuery from './list-maintenance-details.query';

export default class ListMaintenanceDetailsQueryValidator implements QueryValidator {
  validateQuery(listMaintenanceDetailsQuery: ListMaintenanceDetailsQuery): void {
    // no-op
  }
}
