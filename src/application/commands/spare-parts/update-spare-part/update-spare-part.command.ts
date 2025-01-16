import { Command } from '../../common/command';

export default class UpdateSparePartCommand implements Command {
  constructor(
    public readonly sparePartId: string,
    public readonly sparePartPayload: any,
  ) {}
}
