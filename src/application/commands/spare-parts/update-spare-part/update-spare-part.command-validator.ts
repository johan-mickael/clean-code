import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateSparePartCommand from './update-spare-part.command';

export default class UpdateSparePartCommandValidator implements CommandValidator {
  validateCommand(updateSparePartCommand: UpdateSparePartCommand): void {
    const sparePartIdToUpdate = updateSparePartCommand.sparePartId.trim();

    if (!sparePartIdToUpdate) {
      throw new InvalidCommandError(updateSparePartCommand);
    }

    const { name, price, stock } = updateSparePartCommand.sparePartPayload;

    if ((!name.trim() && name !== undefined) || (price <= 0 && price !== undefined) || stock < 0) {
      throw new InvalidCommandError(updateSparePartCommand);
    }
  }
}
