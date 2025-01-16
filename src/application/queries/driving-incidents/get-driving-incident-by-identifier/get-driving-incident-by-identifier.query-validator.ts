import { InvalidQueryError } from '../../common/invalid-query.error';
import { QueryValidator } from '../../common/query-validator';
import GetDrivingIncidentByIdentifierQuery from './get-driving-incident-by-identifier.query';

export default class GetDrivingIncidentByIdentifierQueryValidator implements QueryValidator {
  validateQuery(getDrivingIncidentByIdentifierQuery: GetDrivingIncidentByIdentifierQuery): void {
    const incidentId = getDrivingIncidentByIdentifierQuery.id.trim();

    if (!incidentId) {
      throw new InvalidQueryError();
    }
  }
}

