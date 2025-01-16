import { QueryValidator } from '../../common/query-validator';
import ListDriversQuery from './list-drivers.query';

export default class ListDriversQueryValidator implements QueryValidator {
  validateQuery(listDriversQuery: ListDriversQuery): void {
    //no-op.
  }
}
