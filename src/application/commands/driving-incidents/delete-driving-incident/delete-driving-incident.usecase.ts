import DeleteDrivingIncidentCommand from './delete-driving-incident.command';

export default abstract class DeleteDrivingIncidentUseCase {
  /**
   * @throws InvalidCommandError
   * @throws DrivingIncidentNotFoundError
   */
  abstract execute(deleteDrivingIncidentCommand: DeleteDrivingIncidentCommand): Promise<void>;
}
