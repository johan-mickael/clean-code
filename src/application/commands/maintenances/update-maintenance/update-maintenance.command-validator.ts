import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import UpdateMaintenanceCommand from './update-maintenance.command';

export default class UpdateMaintenanceCommandValidator implements CommandValidator {
  validateCommand(updateMaintenanceCommand: UpdateMaintenanceCommand): void {
    const maintenanceIdToUpdate = updateMaintenanceCommand.maintenanceId.trim();

    if (!maintenanceIdToUpdate) {
      throw new InvalidCommandError(updateMaintenanceCommand);
    }

    const { description, scheduledAt, status } = updateMaintenanceCommand.maintenancePayload;

    if (!description.trim() || !scheduledAt || !status.trim()) {
      throw new InvalidCommandError(updateMaintenanceCommand);
    }
  }
}
