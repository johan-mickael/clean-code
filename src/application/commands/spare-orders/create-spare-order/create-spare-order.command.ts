import { Command } from '../../common/command';

export default class CreateSpareOrderCommand implements Command {
  constructor(public readonly spareOrderPayload: any) {}
}
