import { MaintenanceScheduleDTO } from '../../interfaces/dtos/maintenance_schedules.dto';
import CreatePreventiveMaintenanceForBikeModelCommand from './create-preventive-maintenance-for-bike-model.command';

export default abstract class CreatePreventiveMaintenanceForBikeModelUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(
    createPreventiveMaintenanceForBikeModelCommand: CreatePreventiveMaintenanceForBikeModelCommand,
  ): Promise<MaintenanceScheduleDTO>;
}
