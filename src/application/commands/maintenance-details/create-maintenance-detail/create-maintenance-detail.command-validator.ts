import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateMaintenanceDetailCommand from './create-maintenance-detail.command';

export default class CreateMaintenanceDetailCommandValidator implements CommandValidator {
  validateCommand(createMaintenanceDetailCommand: CreateMaintenanceDetailCommand): void {
    const { maintenanceId, description, cost, performedAt } = createMaintenanceDetailCommand.maintenanceDetailPayload;

    if (!maintenanceId.trim() || !description.trim() || !cost || !performedAt) {
      throw new InvalidCommandError();
    }
  }
}
