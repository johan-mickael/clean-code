import { Command } from '../../common/command';

export default class DeletePartnerCommand implements Command {
  constructor(public readonly partnerId: string) {}
}
