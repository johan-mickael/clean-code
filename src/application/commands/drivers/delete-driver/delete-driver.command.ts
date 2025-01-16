import { Command } from '../../common/command';

export default class DeleteDriverCommand implements Command {
  constructor(public readonly driverId: string) {}
}
