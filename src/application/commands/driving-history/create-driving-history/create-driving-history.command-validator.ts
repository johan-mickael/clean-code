import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateDrivingHistoryCommand from './create-driving-history.command';

export default class CreateDrivingHistoryCommandValidator implements CommandValidator {
  validateCommand(createDrivingHistoryCommand: CreateDrivingHistoryCommand): void {
    const { driverId, description, date } = createDrivingHistoryCommand.historyPayload;

    if (!driverId.trim() || !description.trim() || !date) {
      throw new InvalidCommandError();
    }
  }
}
