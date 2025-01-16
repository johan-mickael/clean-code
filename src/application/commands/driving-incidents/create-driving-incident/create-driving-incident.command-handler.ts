import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import DrivingIncidentDTOMapper from '../../../interfaces/mappers/driving-incident.dto-mapper';
import DrivingIncidentRepositoryWriter from '../../../ports/repositories/writers/driving-incident-repository-writer';
import CreateDrivingIncidentCommand from './create-driving-incident.command';

export default class CreateDrivingIncidentCommandHandler {
  constructor(private readonly drivingIncidentRepositoryWriter: DrivingIncidentRepositoryWriter) {}

  async execute(createDrivingIncidentCommand: CreateDrivingIncidentCommand): Promise<DrivingIncidentDTO> {
    const { drivingHistoryId, label, comments } = createDrivingIncidentCommand.drivingIncidentPayload;

    const drivingIncidentDTO = new DrivingIncidentDTO(null, drivingHistoryId, label, comments);
    const createdDrivingIncident = await this.drivingIncidentRepositoryWriter.create(drivingIncidentDTO);

    return DrivingIncidentDTOMapper.toDTO(createdDrivingIncident);
  }
}
