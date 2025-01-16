import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateDrivingHistoryCommand from './update-driving-history.command';

export default class UpdateDrivingHistoryCommandValidator implements CommandValidator {
  validateCommand(updateDrivingHistoryCommand: UpdateDrivingHistoryCommand): void {
    const historyIdToUpdate = updateDrivingHistoryCommand.drivingHistoryId.trim();

    if (!historyIdToUpdate) {
      throw new InvalidCommandError(updateDrivingHistoryCommand);
    }

    const { description, date } = updateDrivingHistoryCommand.drivingHistoryPayload;

    if (!description.trim() || !date) {
      throw new InvalidCommandError(updateDrivingHistoryCommand);
    }
  }
}
