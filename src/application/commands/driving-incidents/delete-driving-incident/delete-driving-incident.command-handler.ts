import DrivingIncidentRepositoryWriter from '../../../ports/repositories/writers/driving-incident-repository-writer';
import DeleteDrivingIncidentCommand from './delete-driving-incident.command';

export default class DeleteDrivingIncidentCommandHandler {
  constructor(private readonly drivingIncidentRepositoryWriter: DrivingIncidentRepositoryWriter) {}

  async execute(deleteDrivingIncidentCommand: DeleteDrivingIncidentCommand): Promise<void> {
    const drivingIncidentIdInput = deleteDrivingIncidentCommand.drivingIncidentId;

    await this.drivingIncidentRepositoryWriter.delete(drivingIncidentIdInput);
  }
}
