import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreatePartnerCommand from './create-partner.command';

export default class CreatePartnerCommandValidator implements CommandValidator {
  validateCommand(createPartnerCommand: CreatePartnerCommand): void {
    const {
      name: partnerNameInput,
      email: partnerEmailInput,
      dealerId: partnerDealerIdInput,
    } = createPartnerCommand.partnerPayload;

    if (!partnerNameInput || !partnerEmailInput || !partnerDealerIdInput) {
      throw new InvalidCommandError(createPartnerCommand);
    }
  }
}
