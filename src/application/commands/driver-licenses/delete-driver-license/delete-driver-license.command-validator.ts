import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteDriverLicenseCommand from './delete-driver-license.command';

export default class DeleteDriverLicenseCommandValidator implements CommandValidator {
  validateCommand(deleteDriverLicenseCommand: DeleteDriverLicenseCommand): void {
    const driverLicenseIdToDelete = deleteDriverLicenseCommand.driverLicenseId.trim();

    if (!driverLicenseIdToDelete) {
      throw new InvalidCommandError(deleteDriverLicenseCommand);
    }
  }
}
