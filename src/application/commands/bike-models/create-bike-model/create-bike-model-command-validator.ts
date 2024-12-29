import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command-error';
import CreateBikeModelCommand from './create-bike-model-command';

export default class CreateBikeModelCommandValidator implements CommandValidator {
  validateCommand(createBikeModelCommand: CreateBikeModelCommand): void {
    const bikeModelNameInput = createBikeModelCommand.bikePayload.name;

    if (!bikeModelNameInput) {
      throw new InvalidCommandError(createBikeModelCommand);
    }
  }
}
