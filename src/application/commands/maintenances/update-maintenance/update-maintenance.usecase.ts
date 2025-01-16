import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import UpdateMaintenanceCommand from './update-maintenance.command';

export default abstract class UpdateMaintenanceUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateMaintenanceCommand: UpdateMaintenanceCommand): Promise<MaintenanceDTO>;
}
