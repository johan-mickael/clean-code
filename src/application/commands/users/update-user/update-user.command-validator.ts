import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateUserCommand from './update-user.command';

export default class UpdateUserCommandValidator implements CommandValidator {
  validateCommand(updateUserCommand: UpdateUserCommand): void {
    const userIdToUpdate = updateUserCommand.userId.trim();

    if (!userIdToUpdate) {
      throw new InvalidCommandError(updateUserCommand);
    }

    const { email, firstname, lastname } = updateUserCommand.userPayload;

    if (!email.trim() || !firstname.trim() || !lastname.trim()) {
      throw new InvalidCommandError(updateUserCommand);
    }
  }
}
