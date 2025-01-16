import { Error as SequelizeError } from 'sequelize';

import DrivingHistoryRepositoryReader from '@triumph/application/ports/repositories/readers/driving-history-repository-reader';
import DrivingHistory from '@triumph/domain/entity/driving-history';

import DrivingHistoryModel from '../../models/driving-history.model';

export default class SequelizeDrivingHistoryRepository implements DrivingHistoryRepositoryReader {
  async list(): Promise<DrivingHistory[]> {
    const drivingHistories = await DrivingHistoryModel.findAll();

    return drivingHistories.map(
      (history) => new DrivingHistory(history.id, history.driverId, history.bikeId, history.label),
    );
  }

  async getById(id: string): Promise<DrivingHistory | null> {
    try {
      const history = await DrivingHistoryModel.findByPk(id);

      if (!history) {
        return null;
      }

      return new DrivingHistory(history.id, history.driverId, history.bikeId, history.label);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
