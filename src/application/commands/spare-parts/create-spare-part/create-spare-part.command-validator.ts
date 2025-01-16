import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateSparePartCommand from './create-spare-part.command';

export default class CreateSparePartCommandValidator implements CommandValidator {
  validateCommand(createSparePartCommand: CreateSparePartCommand): void {
    const { name, price, stock } = createSparePartCommand.sparePartPayload;

    if (!name.trim() || price <= 0 || stock < 0) {
      throw new InvalidCommandError();
    }
  }
}
