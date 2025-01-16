import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteDrivingHistoryCommand from './delete-driving-history.command';

export default class DeleteDrivingHistoryCommandValidator implements CommandValidator {
  validateCommand(deleteDrivingHistoryCommand: DeleteDrivingHistoryCommand): void {
    const historyIdToDelete = deleteDrivingHistoryCommand.drivingHistoryId.trim();

    if (!historyIdToDelete) {
      throw new InvalidCommandError(deleteDrivingHistoryCommand);
    }
  }
}
