import MaintenanceRepositoryWriter from '../../../ports/repositories/writers/maintenance-repository-writer';
import DeleteMaintenanceCommand from './delete-maintenance.command';

export default class DeleteMaintenanceCommandHandler {
  constructor(private readonly maintenanceRepositoryWriter: MaintenanceRepositoryWriter) {}

  async execute(deleteMaintenanceCommand: DeleteMaintenanceCommand): Promise<void> {
    const maintenanceIdInput = deleteMaintenanceCommand.maintenanceId;

    await this.maintenanceRepositoryWriter.delete(maintenanceIdInput);
  }
}
