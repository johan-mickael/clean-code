import { Command } from '../../common/command';

export default class DeleteMaintenanceCommand implements Command {
  constructor(public readonly maintenanceId: string) {}
}
