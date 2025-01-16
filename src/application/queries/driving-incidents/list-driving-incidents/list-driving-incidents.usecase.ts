import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import ListDrivingIncidentsQuery from './list-driving-incidents.query';

export default abstract class ListDrivingIncidentsUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listDrivingIncidentsQuery: ListDrivingIncidentsQuery): Promise<DrivingIncidentDTO[]>;
}
