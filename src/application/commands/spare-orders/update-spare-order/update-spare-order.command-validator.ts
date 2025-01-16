import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateSpareOrderCommand from './update-spare-order.command';

export default class UpdateSpareOrderCommandValidator implements CommandValidator {
  validateCommand(updateSpareOrderCommand: UpdateSpareOrderCommand): void {
    const spareOrderIdToUpdate = updateSpareOrderCommand.spareOrderId.trim();

    if (!spareOrderIdToUpdate) {
      throw new InvalidCommandError(updateSpareOrderCommand);
    }

    const { quantity, status } = updateSpareOrderCommand.spareOrderPayload;

    if (quantity <= 0 || !status.trim()) {
      throw new InvalidCommandError(updateSpareOrderCommand);
    }
  }
}
