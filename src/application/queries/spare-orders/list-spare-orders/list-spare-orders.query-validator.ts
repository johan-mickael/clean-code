import { QueryValidator } from '../../common/query-validator';
import ListSpareOrdersQuery from './list-spare-orders.query';

export default class ListSpareOrdersQueryValidator implements QueryValidator {
  validateQuery(listSpareOrdersQuery: ListSpareOrdersQuery): void {
    // no-op
  }
}
