import { Error as SequelizeError } from 'sequelize';

import MaintenanceDTO from '@triumph/application/interfaces/dtos/maintenance.dto';
import MaintenanceDTOMapper from '@triumph/application/interfaces/mappers/maintenance.dto-mapper';
import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';
import Maintenance from '@triumph/domain/entity/maintenance';
import { MaintenanceNotFoundError } from '@triumph/domain/errors/maintenances/maintenance-not-found.error';

import MaintenanceModel from '../../models/maintenance.model';

export default class SequelizeMaintenanceRepositoryWriter implements MaintenanceRepositoryWriter {
  async create(maintenanceDTO: MaintenanceDTO): Promise<Maintenance> {
    const maintenanceModel = await MaintenanceModel.create({
      label: maintenanceDTO.label,
      bikeId: maintenanceDTO.bikeId,
      lastMaintenanceDate: maintenanceDTO.lastMaintenanceDate,
      nextMaintenanceDate: maintenanceDTO.nextMaintenanceDate,
      maintenanceType: maintenanceDTO.maintenanceType,
    });

    return MaintenanceDTOMapper.toEntity(maintenanceModel);
  }

  async update(id: string, maintenanceDTO: MaintenanceDTO): Promise<Maintenance> {
    try {
      const [affectedMaintenanceCount, updatedMaintenances] = await MaintenanceModel.update(
        {
          label: maintenanceDTO.label,
          bikeId: maintenanceDTO.bikeId,
          lastMaintenanceDate: maintenanceDTO.lastMaintenanceDate,
          nextMaintenanceDate: maintenanceDTO.nextMaintenanceDate,
          maintenanceType: maintenanceDTO.maintenanceType,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );

      if (affectedMaintenanceCount === 0) {
        throw new MaintenanceNotFoundError();
      }

      const updatedMaintenance = updatedMaintenances[0];
      return MaintenanceDTOMapper.toEntity(updatedMaintenance);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new MaintenanceNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedMaintenanceCount = await MaintenanceModel.destroy({
        where: {
          id,
        },
      });

      if (deletedMaintenanceCount === 0) {
        throw new MaintenanceNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new MaintenanceNotFoundError();
      }

      throw error;
    }
  }
}
