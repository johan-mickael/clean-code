import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateSpareOrderCommand from './create-spare-order.command';

export default class CreateSpareOrderCommandValidator implements CommandValidator {
  validateCommand(createSpareOrderCommand: CreateSpareOrderCommand): void {
    const { sparePartId, quantity, orderedAt } = createSpareOrderCommand.spareOrderPayload;

    if (!sparePartId.trim() || quantity <= 0 || !orderedAt) {
      throw new InvalidCommandError();
    }
  }
}
