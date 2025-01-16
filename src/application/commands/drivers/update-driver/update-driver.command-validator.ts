import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateDriverCommand from './update-driver.command';

export default class UpdateDriverCommandValidator implements CommandValidator {
  validateCommand(updateDriverCommand: UpdateDriverCommand): void {
    const driverIdToUpdate = updateDriverCommand.driverId.trim();

    if (!driverIdToUpdate) {
      throw new InvalidCommandError(updateDriverCommand);
    }

    const { firstName, lastName, licenseId } = updateDriverCommand.driverPayload;

    if (!firstName.trim() || !lastName.trim() || !licenseId.trim()) {
      throw new InvalidCommandError(updateDriverCommand);
    }
  }
}
