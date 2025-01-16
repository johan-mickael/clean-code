import { Command } from '../../common/command';

export default class DeleteSparePartCommand implements Command {
  constructor(public readonly sparePartId: string) {}
}
