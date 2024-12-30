import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdatePartnerCommand from './update-partner.command';

export default class UpdatePartnerCommandValidator implements CommandValidator {
  validateCommand(updatePartnerCommand: UpdatePartnerCommand): void {
    const partnerIdToUpdate = updatePartnerCommand.partnerId;

    if (!partnerIdToUpdate) {
      throw new InvalidCommandError(updatePartnerCommand);
    }

    const partnerData = updatePartnerCommand.partnerData;
    const { name: partnerNameInput, email: partnerEmailInput, dealerId: partnerDealerIdInput } = partnerData;

    if (!partnerData || !partnerNameInput || !partnerEmailInput || !partnerDealerIdInput) {
      throw new InvalidCommandError(updatePartnerCommand);
    }
  }
}
