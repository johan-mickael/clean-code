import { Command } from '../../common/command';

export default class DeleteSpareOrderCommand implements Command {
  constructor(public readonly spareOrderId: string) {}
}
