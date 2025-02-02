import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import GetDrivingIncidentByIdentifierQuery from './get-driving-incident-by-identifier.query';

export default abstract class GetDrivingIncidentByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws DrivingIncidentNotFoundError
   */
  abstract execute(
    getDrivingIncidentByIdentifierQuery: GetDrivingIncidentByIdentifierQuery,
  ): Promise<DrivingIncidentDTO>;
}
