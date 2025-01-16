import { Command } from '../../common/command';

export default class DeleteMaintenanceDetailCommand implements Command {
  constructor(public readonly maintenanceDetailId: string) {}
}
