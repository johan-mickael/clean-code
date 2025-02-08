import MaintenanceRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-repository-reader';
import Maintenance from '@triumph/domain/entity/maintenance/maintenance';
import FinishedMaintenance from '@triumph/domain/entity/maintenance/status/finished-maintenance';
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

    const lastMaintenanceForBikeEntity = this.createMaintenanceEntityFromDatabase(lastMaintenanceForBike);

    return lastMaintenanceForBikeEntity;
  }

  async getLastFinishedMaintenanceForBike(bikeId: string): Promise<Maintenance | null> {
    const lastMaintenanceForBike = await maintenanceModel
      .findOne({
        bike_id: bikeId,
        status: new FinishedMaintenance().value,
      })
      .sort({ maintenance_date: -1 });

    if (!lastMaintenanceForBike) {
      return null;
    }

    const lastMaintenanceForBikeEntity = this.createMaintenanceEntityFromDatabase(lastMaintenanceForBike);

    return lastMaintenanceForBikeEntity;
  }

  list(): Promise<any> {
    throw new Error('Method not implemented.');
  }
  getById(id: string): Promise<Maintenance | null> {
    throw new Error('Method not implemented.');
  }

  private createMaintenanceEntityFromDatabase(maintenance: any): Maintenance {
    const maintenanceEntity = new Maintenance(
      maintenance.label,
      maintenance.bike_id,
      MaintenanceStatusFactory.create(maintenance.status),
      maintenance.maintenance_date || undefined,
    );

    maintenanceEntity.id = maintenance._id;

    return maintenanceEntity;
  }
}
