import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteDrivingIncidentCommand from './delete-driving-incident.command';

export default class DeleteDrivingIncidentCommandValidator implements CommandValidator {
  validateCommand(deleteDrivingIncidentCommand: DeleteDrivingIncidentCommand): void {
    const incidentIdToDelete = deleteDrivingIncidentCommand.drivingIncidentId.trim();

    if (!incidentIdToDelete) {
      throw new InvalidCommandError(deleteDrivingIncidentCommand);
    }
  }
}
