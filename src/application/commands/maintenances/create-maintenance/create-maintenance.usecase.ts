import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import CreateMaintenanceCommand from './create-maintenance.command';

export default abstract class CreateMaintenanceUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createMaintenanceCommand: CreateMaintenanceCommand): Promise<MaintenanceDTO>;
}
