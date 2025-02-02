import { DrivingIncidentNotFoundError } from '@triumph/domain/errors/driving-incidents/driving-incident-not-found.error';

import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import DrivingIncidentDTOMapper from '../../../interfaces/mappers/driving-incident.dto-mapper';
import DrivingIncidentRepositoryReader from '../../../ports/repositories/readers/driving-incident-repository-reader';
import GetDrivingIncidentByIdQuery from './get-driving-incident-by-identifier.query';

export default class GetDrivingIncidentByIdQueryHandler {
  constructor(private readonly drivingIncidentRepository: DrivingIncidentRepositoryReader) {}

  async execute(getDrivingIncidentByIdQuery: GetDrivingIncidentByIdQuery): Promise<DrivingIncidentDTO> {
    const drivingIncidentIdInput = getDrivingIncidentByIdQuery.id;
    const foundIncident = await this.drivingIncidentRepository.getById(drivingIncidentIdInput);

    if (foundIncident !== null) {
      return DrivingIncidentDTOMapper.toDTO(foundIncident);
    }

    throw new DrivingIncidentNotFoundError();
  }
}
