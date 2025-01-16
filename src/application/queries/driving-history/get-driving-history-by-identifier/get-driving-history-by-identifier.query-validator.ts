import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetDrivingHistoryByDriverQuery from './get-driving-history-by-identifier.query';

export default class GetDrivingHistoryByDriverQueryValidator implements QueryValidator {
  validateQuery(getDrivingHistoryByDriverQuery: GetDrivingHistoryByDriverQuery): void {
    const driverId = getDrivingHistoryByDriverQuery.id.trim();

    if (!driverId) {
      throw new InvalidQueryError();
    }
  }
}
