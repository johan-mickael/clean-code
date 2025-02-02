import MaintenanceEntity from '@triumph/domain/entity/maintenance/maintenance';

export default abstract class MaintenanceRepositoryWriter {
  abstract create(maintenanceData: any): Promise<MaintenanceEntity>;
}
