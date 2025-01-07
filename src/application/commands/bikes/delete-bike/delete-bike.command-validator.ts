import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteBikeCommand from './delete-bike.command';

export default class DeleteBikeCommandValidator implements CommandValidator {
  validateCommand(deleteBikeCommand: DeleteBikeCommand): void {
    const bikeIdToDelete = deleteBikeCommand.bikeId.trim();

    if (!bikeIdToDelete) {
      throw new InvalidCommandError(deleteBikeCommand);
    }
  }
}
