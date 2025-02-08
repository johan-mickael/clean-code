import MaintenanceEntity from '@triumph/domain/entity/maintenance/maintenance';

import BaseRepositoryReader from './base.repository-reader';

export default abstract class MaintenanceRepositoryReader extends BaseRepositoryReader<MaintenanceEntity> {
  abstract getLastScheduledMaintenanceForBike(bikeId: string): Promise<MaintenanceEntity | null>;
  abstract getLastFinishedMaintenanceForBike(bikeId: string): Promise<MaintenanceEntity | null>;
}
