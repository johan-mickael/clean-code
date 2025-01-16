import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateMaintenanceDetailCommand from './update-maintenance-detail.command';

export default class UpdateMaintenanceDetailCommandValidator implements CommandValidator {
  validateCommand(updateMaintenanceDetailCommand: UpdateMaintenanceDetailCommand): void {
    const detailIdToUpdate = updateMaintenanceDetailCommand.maintenanceDetailId.trim();

    if (!detailIdToUpdate) {
      throw new InvalidCommandError(updateMaintenanceDetailCommand);
    }

    const { description, cost, performedAt } = updateMaintenanceDetailCommand.maintenanceDetailPayload;

    if (!description.trim() || !cost || !performedAt) {
      throw new InvalidCommandError(updateMaintenanceDetailCommand);
    }
  }
}
