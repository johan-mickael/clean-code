import MaintenanceDetailRepositoryWriter from '../../../ports/repositories/writers/maintenance-detail-repository-writer';
import DeleteMaintenanceDetailCommand from './delete-maintenance-detail.command';

export default class DeleteMaintenanceDetailCommandHandler {
  constructor(private readonly maintenanceDetailRepositoryWriter: MaintenanceDetailRepositoryWriter) {}

  async execute(deleteMaintenanceDetailCommand: DeleteMaintenanceDetailCommand): Promise<void> {
    const maintenanceDetailIdInput = deleteMaintenanceDetailCommand.maintenanceDetailId;

    await this.maintenanceDetailRepositoryWriter.delete(maintenanceDetailIdInput);
  }
}
