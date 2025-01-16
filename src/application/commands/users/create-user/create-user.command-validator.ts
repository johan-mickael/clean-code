import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateUserCommand from './create-user.command';

export default class CreateUserCommandValidator implements CommandValidator {
  validateCommand(createUserCommand: CreateUserCommand): void {
    const { email, firstname, lastname } = createUserCommand.userPayload;

    if (!email.trim() || !firstname.trim() || !lastname.trim()) {
      throw new InvalidCommandError();
    }
  }
}
