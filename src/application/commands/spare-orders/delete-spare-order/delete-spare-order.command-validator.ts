import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteSpareOrderCommand from './delete-spare-order.command';

export default class DeleteSpareOrderCommandValidator implements CommandValidator {
  validateCommand(deleteSpareOrderCommand: DeleteSpareOrderCommand): void {
    const spareOrderIdToDelete = deleteSpareOrderCommand.spareOrderId.trim();

    if (!spareOrderIdToDelete) {
      throw new InvalidCommandError(deleteSpareOrderCommand);
    }
  }
}
