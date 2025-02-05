import MaintenanceRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-repository-reader';
import Maintenance from '@triumph/domain/entity/maintenance/maintenance';
import { MaintenanceStatusFactory } from '@triumph/domain/entity/maintenance/status/maintenance-status.factory';
import ScheduledMaintenance from '@triumph/domain/entity/maintenance/status/scheduled-maintenance';

import maintenanceModel from '../../models/maintenance.model';

export default class MongooseMaintenanceRepositoryReader implements MaintenanceRepositoryReader {
  async getLastScheduledMaintenanceForBike(bikeId: string): Promise<Maintenance | null> {
    const lastMaintenanceForBike = await maintenanceModel
      .findOne({
        bike_id: bikeId,
        status: new ScheduledMaintenance().value,
      })
      .sort({ date: -1 });

    if (!lastMaintenanceForBike) {
      return null;
    }

    const lastMaintenanceForBikeEntity = new Maintenance(
      lastMaintenanceForBike.label,
      lastMaintenanceForBike.bike_id,
      MaintenanceStatusFactory.create(lastMaintenanceForBike.status),
      lastMaintenanceForBike.maintenance_date || undefined,
    );

    lastMaintenanceForBikeEntity.id = lastMaintenanceForBike._id;

    return lastMaintenanceForBikeEntity;
  }
  list(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Maintenance | null> {
    throw new Error('Method not implemented.');
  }
}
