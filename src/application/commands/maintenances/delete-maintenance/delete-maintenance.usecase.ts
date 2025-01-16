import DeleteMaintenanceCommand from './delete-maintenance.command';

export default abstract class DeleteMaintenanceUseCase {
  /**
   * @throws InvalidCommandError
   * @throws MaintenanceNotFoundError
   */
  abstract execute(deleteMaintenanceCommand: DeleteMaintenanceCommand): Promise<void>;
}
