import { CommandValidator } from '../../common/command-validator';
import { InvalidCommandError } from '../../common/invalid-command.error';
import CreateMaintenanceCommand from './create-maintenance.command';

export default class CreateMaintenanceCommandValidator implements CommandValidator {
  validateCommand(createMaintenanceCommand: CreateMaintenanceCommand): void {
    const { bikeId, description, scheduledAt } = createMaintenanceCommand.maintenancePayload;

    if (!bikeId.trim() || !description.trim() || !scheduledAt) {
      throw new InvalidCommandError();
    }
  }
}
