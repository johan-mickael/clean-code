import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import DeleteMaintenanceDetailCommand from './delete-maintenance-detail.command';

export default class DeleteMaintenanceDetailCommandValidator implements CommandValidator {
  validateCommand(deleteMaintenanceDetailCommand: DeleteMaintenanceDetailCommand): void {
    const detailIdToDelete = deleteMaintenanceDetailCommand.maintenanceDetailId.trim();

    if (!detailIdToDelete) {
      throw new InvalidCommandError(deleteMaintenanceDetailCommand);
    }
  }
}
