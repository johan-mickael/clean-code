import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateDrivingIncidentCommand from './update-driving-incident.command';

export default class UpdateDrivingIncidentCommandValidator implements CommandValidator {
  validateCommand(updateDrivingIncidentCommand: UpdateDrivingIncidentCommand): void {
    const incidentIdToUpdate = updateDrivingIncidentCommand.drivingIncidentId.trim();

    if (!incidentIdToUpdate) {
      throw new InvalidCommandError(updateDrivingIncidentCommand);
    }

    const { type, description, date } = updateDrivingIncidentCommand.drivingIncidentPayload;

    if (!type.trim() || !description.trim() || !date) {
      throw new InvalidCommandError(updateDrivingIncidentCommand);
    }
  }
}
