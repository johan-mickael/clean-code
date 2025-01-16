import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteUserCommand from './delete-user.command';

export default class DeleteUserCommandValidator implements CommandValidator {
  validateCommand(deleteUserCommand: DeleteUserCommand): void {
    const userIdToDelete = deleteUserCommand.userId.trim();

    if (!userIdToDelete) {
      throw new InvalidCommandError(deleteUserCommand);
    }
  }
}
