import { Query } from './query';

export interface QueryValidator {
  validateQuery(query: Query): void;
}
