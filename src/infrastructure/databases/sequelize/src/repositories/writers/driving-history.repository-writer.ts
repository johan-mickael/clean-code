import { Error as SequelizeError } from 'sequelize';

import DrivingHistoryDTO from '@triumph/application/interfaces/dtos/driving-history.dto';
import DrivingHistoryDTOMapper from '@triumph/application/interfaces/mappers/driving-history.dto-mapper';
import DrivingHistoryRepositoryWriter from '@triumph/application/ports/repositories/writers/driving-history-repository-writer';
import DrivingHistory from '@triumph/domain/entity/driving-history';
import { DrivingHistoryNotFoundError } from '@triumph/domain/errors/driving-history/driving-history-not-found.error';

import DrivingHistoryModel from '../../models/driving-history.model';

export default class SequelizeDrivingHistoryRepositoryWriter implements DrivingHistoryRepositoryWriter {
  async create(drivingHistoryDTO: DrivingHistoryDTO): Promise<DrivingHistory> {
    const historyModel = await DrivingHistoryModel.create({
      driverId: drivingHistoryDTO.driverId,
      bikeId: drivingHistoryDTO.bikeId,
      label: drivingHistoryDTO.label,
    });

    return DrivingHistoryDTOMapper.toEntity(historyModel);
  }

  async update(id: string, drivingHistoryDTO: DrivingHistoryDTO): Promise<DrivingHistory> {
    try {
      const [affectedHistoryCount, updatedHistories] = await DrivingHistoryModel.update(
        {
          driverId: drivingHistoryDTO.driverId,
          bikeId: drivingHistoryDTO.bikeId,
          label: drivingHistoryDTO.label,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (affectedHistoryCount === 0) {
        throw new DrivingHistoryNotFoundError();
      }

      const updatedHistory = updatedHistories[0];
      return DrivingHistoryDTOMapper.toEntity(updatedHistory);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new DrivingHistoryNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedHistoryCount = await DrivingHistoryModel.destroy({
        where: { id },
      });

      if (deletedHistoryCount === 0) {
        throw new DrivingHistoryNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new DrivingHistoryNotFoundError();
      }

      throw error;
    }
  }
}
