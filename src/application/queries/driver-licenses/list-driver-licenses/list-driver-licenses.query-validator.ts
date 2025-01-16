import { QueryValidator } from '../../common/query-validator';
import ListDriverLicensesQuery from './list-driver-licenses.query';

export default class ListDriverLicensesQueryValidator implements QueryValidator {
  validateQuery(listDriverLicensesQuery: ListDriverLicensesQuery): void {
    // No validation required for listing, so no-op.
  }
}
