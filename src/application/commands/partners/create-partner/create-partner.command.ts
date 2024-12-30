import { Command } from '../../common/command';

export default class CreatePartnerCommand implements Command {
  constructor(public readonly partnerPayload: any) {}
}
