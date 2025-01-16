import { QueryValidator } from '../../common/query-validator';
import ListMaintenancesQuery from './list-maintenances.query';

export default class ListMaintenancesQueryValidator implements QueryValidator {
  validateQuery(listMaintenancesQuery: ListMaintenancesQuery): void {
    // no-op
  }
}
