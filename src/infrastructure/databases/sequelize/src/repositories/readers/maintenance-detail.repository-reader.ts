import { Error as SequelizeError } from 'sequelize';

import MaintenanceDetailRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-detail-repository-reader';
import MaintenanceDetail from '@triumph/domain/entity/maintenance-detail';

import MaintenanceDetailModel from '../../models/maintenance-detail.model';

export default class SequelizeMaintenanceDetailRepository implements MaintenanceDetailRepositoryReader {
  async list(): Promise<MaintenanceDetail[]> {
    const maintenanceDetails = await MaintenanceDetailModel.findAll();

    return maintenanceDetails.map(
      (detail) =>
        new MaintenanceDetail(
          detail.id,
          detail.label,
          detail.maintenanceId,
          detail.sparePartId,
          detail.maintenanceType,
          detail.price,
          detail.comments,
        ),
    );
  }

  async getById(id: string): Promise<MaintenanceDetail | null> {
    try {
      const detail = await MaintenanceDetailModel.findByPk(id);

      if (!detail) {
        return null;
      }

      return new MaintenanceDetail(
        detail.id,
        detail.label,
        detail.maintenanceId,
        detail.sparePartId,
        detail.maintenanceType,
        detail.price,
        detail.comments,
      );
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
