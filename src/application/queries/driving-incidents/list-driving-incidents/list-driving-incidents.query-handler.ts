import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import DrivingIncidentDTOMapper from '../../../interfaces/mappers/driving-incident.dto-mapper';
import DrivingIncidentRepositoryReader from '../../../ports/repositories/readers/driving-incident-repository-reader';
import ListDrivingIncidentsQuery from './list-driving-incidents.query';

export default class ListDrivingIncidentsQueryHandler {
  constructor(private readonly drivingIncidentRepositoryReader: DrivingIncidentRepositoryReader) {}

  async execute(listDrivingIncidentsQuery: ListDrivingIncidentsQuery): Promise<DrivingIncidentDTO[]> {
    const incidents = await this.drivingIncidentRepositoryReader.list();

    return incidents.map(DrivingIncidentDTOMapper.toDTO);
  }
}
