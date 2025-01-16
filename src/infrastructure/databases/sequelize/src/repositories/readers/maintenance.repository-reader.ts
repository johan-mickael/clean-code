import { Error as SequelizeError } from 'sequelize';

import MaintenanceRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-repository-reader';
import Maintenance from '@triumph/domain/entity/maintenance';

import MaintenanceModel from '../../models/maintenance.model';

export default class SequelizeMaintenanceRepository implements MaintenanceRepositoryReader {
  async list(): Promise<Maintenance[]> {
    const maintenances = await MaintenanceModel.findAll();

    return maintenances.map(
      (maintenance) => new Maintenance(maintenance.id, maintenance.label, maintenance.bikeId, maintenance.lastMaintenanceDate, maintenance.nextMaintenanceDate, maintenance.maintenanceType),
    );
  }

  async getById(id: string): Promise<Maintenance | null> {
    try {
      const maintenance = await MaintenanceModel.findByPk(id);

      if (!maintenance) {
        return null;
      }

      return new Maintenance(maintenance.id, maintenance.label, maintenance.bikeId, maintenance.lastMaintenanceDate, maintenance.nextMaintenanceDate, maintenance.maintenanceType);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
