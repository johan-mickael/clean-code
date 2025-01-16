import DeleteMaintenanceDetailCommand from './delete-maintenance-detail.command';

export default abstract class DeleteMaintenanceDetailUseCase {
  /**
   * @throws InvalidCommandError
   * @throws MaintenanceDetailNotFoundError
   */
  abstract execute(deleteMaintenanceDetailCommand: DeleteMaintenanceDetailCommand): Promise<void>;
}
