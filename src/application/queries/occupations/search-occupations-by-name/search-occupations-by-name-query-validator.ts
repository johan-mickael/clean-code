import { InvalidQueryError } from '../../invalid-query-error';
import { QueryValidator } from '../../query-validator';
import SearchOccupationsByNameQuery from './search-occupations-by-name-query';

export default class SearchOccupationsByNameQueryValidator implements QueryValidator {
  validateQuery(query: SearchOccupationsByNameQuery): void {
    if (!query.name) {
      throw new InvalidQueryError();
    }
  }
}
