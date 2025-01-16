import { QueryValidator } from '../../common/query-validator';
import ListUsersQuery from './list-users.query';

export default class ListUsersQueryValidator implements QueryValidator {
  validateQuery(listUsersQuery: ListUsersQuery): void {
    // no-op
  }
}
