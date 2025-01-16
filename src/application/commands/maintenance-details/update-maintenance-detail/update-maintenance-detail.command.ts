import { Command } from '../../common/command';

export default class UpdateMaintenanceDetailCommand implements Command {
  constructor(
    public readonly maintenanceDetailId: string,
    public readonly maintenanceDetailPayload: any,
  ) {}
}
