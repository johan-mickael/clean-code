import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';
import Maintenance from '@triumph/domain/entity/maintenance/maintenance';

import MaintenanceModel from '../../models/maintenance.model';

export default class MongooseMaintenanceRepositoryWriter implements MaintenanceRepositoryWriter {
  async create(maintenanceData: any): Promise<Maintenance> {
    const createdMaintenance = await MaintenanceModel.create({
      label: maintenanceData.maintenanceLabel,
      bike_id: maintenanceData.bikeId,
      maintenance_date: maintenanceData.maintenanceDate,
      status: maintenanceData.status,
    });

    return this.maintenanceFromDatabase(createdMaintenance);
  }

  private async maintenanceFromDatabase(maintenance: any): Promise<Maintenance> {
    const maintenanceEntity = new Maintenance(
      maintenance.label,
      maintenance.bike_id,
      maintenance.maintenance_date,
      maintenance.status,
    );

    maintenanceEntity.id = maintenance._id;

    return maintenanceEntity;
  }
}
