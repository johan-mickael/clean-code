import { Command } from '../../common/command';

export default class UpdateDriverCommand implements Command {
  constructor(
    public readonly driverId: string,
    public readonly driverPayload: any,
  ) {}
}
