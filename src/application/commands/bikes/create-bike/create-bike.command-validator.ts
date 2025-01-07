import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateBikeCommand from './create-bike.command';

export default class CreateBikeCommandValidator implements CommandValidator {
  validateCommand(createBikeCommand: CreateBikeCommand): void {
    const { bikeModelId, partnerId } = createBikeCommand.bikePayload;

    if (!bikeModelId.trim() || !partnerId.trim()) {
      throw new InvalidCommandError();
    }
  }
}
