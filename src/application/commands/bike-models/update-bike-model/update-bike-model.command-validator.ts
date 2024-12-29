import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateBikeModelCommand from './update-bike-model.command';

export default class UpdateBikeModelCommandValidator implements CommandValidator {
  validateCommand(updateBikeModelCommand: UpdateBikeModelCommand): void {
    const bikeModelIdToUpdate = updateBikeModelCommand.bikeModelId;

    if (!bikeModelIdToUpdate) {
      throw new InvalidCommandError(updateBikeModelCommand);
    }

    const bikeModelData = updateBikeModelCommand.bikeModelData;

    if (!bikeModelData || !bikeModelData.name) {
      throw new InvalidCommandError(updateBikeModelCommand);
    }
  }
}
