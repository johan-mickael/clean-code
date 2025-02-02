import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import DrivingIncidentDTOMapper from '../../../interfaces/mappers/driving-incident.dto-mapper';
import DrivingIncidentRepositoryWriter from '../../../ports/repositories/writers/driving-incident-repository-writer';
import UpdateDrivingIncidentCommand from './update-driving-incident.command';

export default class UpdateDrivingIncidentCommandHandler {
  constructor(private readonly drivingIncidentRepositoryWriter: DrivingIncidentRepositoryWriter) {}

  async execute(updateDrivingIncidentCommand: UpdateDrivingIncidentCommand): Promise<DrivingIncidentDTO> {
    const { drivingIncidentId, drivingIncidentPayload } = updateDrivingIncidentCommand;
    const { drivingHistoryId, label, comments } = drivingIncidentPayload;

    const drivingIncidentDTO = new DrivingIncidentDTO(drivingIncidentId, drivingHistoryId, label, comments);
    const updatedDrivingIncident = await this.drivingIncidentRepositoryWriter.update(
      drivingIncidentId,
      drivingIncidentDTO,
    );

    return DrivingIncidentDTOMapper.toDTO(updatedDrivingIncident);
  }
}
