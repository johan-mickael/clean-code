import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateDriverCommand from './create-driver.command';

export default class CreateDriverCommandValidator implements CommandValidator {
  validateCommand(createDriverCommand: CreateDriverCommand): void {
    const { firstName, lastName, licenseId } = createDriverCommand.driverPayload;

    if (!firstName.trim() || !lastName.trim() || !licenseId.trim()) {
      throw new InvalidCommandError();
    }
  }
}
