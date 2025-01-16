import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteMaintenanceCommand from './delete-maintenance.command';

export default class DeleteMaintenanceCommandValidator implements CommandValidator {
  validateCommand(deleteMaintenanceCommand: DeleteMaintenanceCommand): void {
    const maintenanceIdToDelete = deleteMaintenanceCommand.maintenanceId.trim();

    if (!maintenanceIdToDelete) {
      throw new InvalidCommandError(deleteMaintenanceCommand);
    }
  }
}
