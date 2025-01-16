import { QueryValidator } from '../../common/query-validator';
import ListDrivingIncidentsQuery from './list-driving-incidents.query';

export default class ListDrivingIncidentsQueryValidator implements QueryValidator {
  validateQuery(listDrivingIncidentsQuery: ListDrivingIncidentsQuery): void {
    // no-op
  }
}
