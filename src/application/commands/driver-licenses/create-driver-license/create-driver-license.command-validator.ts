import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateDriverLicenseCommand from './create-driver-license.command';

export default class CreateDriverLicenseCommandValidator implements CommandValidator {
  validateCommand(createDriverLicenseCommand: CreateDriverLicenseCommand): void {
    const { licenseNumber, driverId } = createDriverLicenseCommand.driverLicensePayload;

    if (!licenseNumber.trim() || !driverId.trim()) {
      throw new InvalidCommandError();
    }
  }
}
