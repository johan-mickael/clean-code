import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import UpdateMaintenanceDetailCommand from './update-maintenance-detail.command';

export default abstract class UpdateMaintenanceDetailUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateMaintenanceDetailCommand: UpdateMaintenanceDetailCommand): Promise<MaintenanceDetailDTO>;
}
