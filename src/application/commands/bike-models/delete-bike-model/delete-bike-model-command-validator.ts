import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command-error';
import DeleteBikeModelCommand from './delete-bike-model-command';

export default class DeleteBikeModelCommandValidator implements CommandValidator {
  validateCommand(deleteBikeModelCommand: DeleteBikeModelCommand): void {
    const bikeModelIdToUpdate = deleteBikeModelCommand.bikeModelId;

    if (!bikeModelIdToUpdate) {
      throw new InvalidCommandError(deleteBikeModelCommand);
    }
  }
}
