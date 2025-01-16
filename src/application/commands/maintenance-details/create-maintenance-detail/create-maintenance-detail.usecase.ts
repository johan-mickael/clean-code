import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import CreateMaintenanceDetailCommand from './create-maintenance-detail.command';

export default abstract class CreateMaintenanceDetailUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createMaintenanceDetailCommand: CreateMaintenanceDetailCommand): Promise<MaintenanceDetailDTO>;
}
