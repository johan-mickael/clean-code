import { Command } from '../../common/command';

export default class UpdateMaintenanceCommand implements Command {
  constructor(
    public readonly maintenanceId: string,
    public readonly maintenancePayload: any,
  ) {}
}
