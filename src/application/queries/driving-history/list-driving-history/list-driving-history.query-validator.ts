import { QueryValidator } from '../../common/query-validator';
import ListDrivingHistoryQuery from './list-driving-history.query';

export default class ListDrivingHistoryQueryValidator implements QueryValidator {
  validateQuery(listDrivingHistoryQuery: ListDrivingHistoryQuery): void {
    // no-op
  }
}
