import { Command } from '../../common/command';

export default class CreateMaintenanceCommand implements Command {
  constructor(public readonly maintenancePayload: any) {}
}
