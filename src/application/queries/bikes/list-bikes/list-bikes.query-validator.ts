import { QueryValidator } from '../../common/query-validator';
import ListBikesQuery from './list-bikes.query';

export default class ListBikesQueryValidator implements QueryValidator {
  validateQuery(listBikesQuery: ListBikesQuery): void {
    // no-op
  }
}
