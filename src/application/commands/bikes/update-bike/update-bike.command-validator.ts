import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateBikeCommand from './update-bike.command';

export default class UpdateBikeCommandValidator implements CommandValidator {
  validateCommand(updateBikeCommand: UpdateBikeCommand): void {
    const bikeIdToUpdate = updateBikeCommand.bikeId.trim();

    if (!bikeIdToUpdate) {
      throw new InvalidCommandError(updateBikeCommand);
    }

    const { bikeModelId, partnerId } = updateBikeCommand.bikePayload;

    if (!bikeModelId.trim() || !partnerId.trim()) {
      throw new InvalidCommandError(updateBikeCommand);
    }
  }
}
