import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateBikeCommand from './create-bike.command';

export default class CreateBikeCommandValidator implements CommandValidator {
  validateCommand(createBikeCommand: CreateBikeCommand): void {
    const { bike_model_id, partner_id } = createBikeCommand.bikePayload;

    if (!bike_model_id || !partner_id) {
      throw new InvalidCommandError();
    }

    const { normalizedBikeModelId, normalizedPartnerId } = {
      normalizedBikeModelId: bike_model_id.trim(),
      normalizedPartnerId: partner_id.trim(),
    };

    if (!normalizedBikeModelId || !normalizedPartnerId) {
      throw new InvalidCommandError();
    }
  }
}
