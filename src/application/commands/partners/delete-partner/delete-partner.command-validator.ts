import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeletePartnerCommand from './delete-partner.command';

export default class DeletePartnerCommandValidator implements CommandValidator {
  validateCommand(deletePartnerCommand: DeletePartnerCommand): void {
    const partnerIdToDelete = deletePartnerCommand.partnerId;

    if (!partnerIdToDelete) {
      throw new InvalidCommandError(deletePartnerCommand);
    }
  }
}
