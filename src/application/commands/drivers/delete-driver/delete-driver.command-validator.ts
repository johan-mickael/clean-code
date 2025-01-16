import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteDriverCommand from './delete-driver.command';

export default class DeleteDriverCommandValidator implements CommandValidator {
  validateCommand(deleteDriverCommand: DeleteDriverCommand): void {
    const driverIdToDelete = deleteDriverCommand.driverId.trim();

    if (!driverIdToDelete) {
      throw new InvalidCommandError(deleteDriverCommand);
    }
  }
}
