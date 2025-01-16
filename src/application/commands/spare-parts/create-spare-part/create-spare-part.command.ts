import { Command } from '../../common/command';

export default class CreateSparePartCommand implements Command {
  constructor(public readonly sparePartPayload: any) {}
}
