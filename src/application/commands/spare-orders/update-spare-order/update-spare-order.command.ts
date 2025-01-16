import { Command } from '../../common/command';

export default class UpdateSpareOrderCommand implements Command {
  constructor(
    public readonly spareOrderId: string,
    public readonly spareOrderPayload: any,
  ) {}
}
