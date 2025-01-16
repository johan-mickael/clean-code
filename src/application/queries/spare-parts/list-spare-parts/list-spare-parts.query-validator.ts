import { QueryValidator } from '../../common/query-validator';
import ListSparePartsQuery from './list-spare-parts.query';

export default class ListSparePartsQueryValidator implements QueryValidator {
  validateQuery(listSparePartsQuery: ListSparePartsQuery): void {
    // no-op
  }
}
