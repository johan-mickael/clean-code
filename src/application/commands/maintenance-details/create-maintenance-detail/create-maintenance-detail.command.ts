import { Command } from '../../common/command';

export default class CreateMaintenanceDetailCommand implements Command {
  constructor(public readonly maintenanceDetailPayload: any) {}
}
