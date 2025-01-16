import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateDriverLicenseCommand from './update-driver-license.command';

export default class UpdateDriverLicenseCommandValidator implements CommandValidator {
  validateCommand(updateDriverLicenseCommand: UpdateDriverLicenseCommand): void {
    const driverLicenseIdToUpdate = updateDriverLicenseCommand.driverLicenseId.trim();

    if (!driverLicenseIdToUpdate) {
      throw new InvalidCommandError(updateDriverLicenseCommand);
    }

    const { licenseNumber, driverId } = updateDriverLicenseCommand.driverLicensePayload;

    if (!licenseNumber.trim() || !driverId.trim()) {
      throw new InvalidCommandError(updateDriverLicenseCommand);
    }
  }
}
