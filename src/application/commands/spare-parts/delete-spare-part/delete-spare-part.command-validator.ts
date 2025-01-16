import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteSparePartCommand from './delete-spare-part.command';

export default class DeleteSparePartCommandValidator implements CommandValidator {
  validateCommand(deleteSparePartCommand: DeleteSparePartCommand): void {
    const sparePartIdToDelete = deleteSparePartCommand.sparePartId.trim();

    if (!sparePartIdToDelete) {
      throw new InvalidCommandError(deleteSparePartCommand);
    }
  }
}
