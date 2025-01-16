import { Command } from '../../common/command';

export default class CreateDriverCommand implements Command {
  constructor(public readonly driverPayload: any) {}
}
