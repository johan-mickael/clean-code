import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateDrivingIncidentCommand from './create-driving-incident.command';

export default class CreateDrivingIncidentCommandValidator implements CommandValidator {
  validateCommand(createDrivingIncidentCommand: CreateDrivingIncidentCommand): void {
    const { driverId, type, description, date } = createDrivingIncidentCommand.drivingIncidentPayload;

    if (!driverId.trim() || !type.trim() || !description.trim() || !date) {
      throw new InvalidCommandError();
    }
  }
}
