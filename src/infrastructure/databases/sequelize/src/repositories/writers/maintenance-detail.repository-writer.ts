import { Error as SequelizeError } from 'sequelize';

import MaintenanceDetailDTO from '@triumph/application/interfaces/dtos/maintenance-detail.dto';
import MaintenanceDetailDTOMapper from '@triumph/application/interfaces/mappers/maintenance-detail.dto-mapper';
import MaintenanceDetailRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-detail-repository-writer';
import MaintenanceDetail from '@triumph/domain/entity/maintenance-detail';
import { MaintenanceDetailNotFoundError } from '@triumph/domain/errors/maintenance-details/maintenance-detail-not-found.error';

import MaintenanceDetailModel from '../../models/maintenance-detail.model';

export default class SequelizeMaintenanceDetailRepositoryWriter implements MaintenanceDetailRepositoryWriter {
  async create(maintenanceDetailDTO: MaintenanceDetailDTO): Promise<MaintenanceDetail> {
    const maintenanceDetailModel = await MaintenanceDetailModel.create({
      label: maintenanceDetailDTO.label,
      maintenanceId: maintenanceDetailDTO.maintenanceId,
      sparePartId: maintenanceDetailDTO.sparePartId,
      maintenanceType: maintenanceDetailDTO.maintenanceType,
      price: maintenanceDetailDTO.price,
      comments: maintenanceDetailDTO.comments,
    });

    return MaintenanceDetailDTOMapper.toEntity(maintenanceDetailModel);
  }

  async update(id: string, maintenanceDetailDTO: MaintenanceDetailDTO): Promise<MaintenanceDetail> {
    try {
      const [affectedDetailCount, updatedDetails] = await MaintenanceDetailModel.update(
        {
          label: maintenanceDetailDTO.label,
          maintenanceId: maintenanceDetailDTO.maintenanceId,
          sparePartId: maintenanceDetailDTO.sparePartId,
          maintenanceType: maintenanceDetailDTO.maintenanceType,
          price: maintenanceDetailDTO.price,
          comments: maintenanceDetailDTO.comments,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (affectedDetailCount === 0) {
        throw new MaintenanceDetailNotFoundError();
      }

      const updatedDetail = updatedDetails[0];
      return MaintenanceDetailDTOMapper.toEntity(updatedDetail);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new MaintenanceDetailNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedDetailCount = await MaintenanceDetailModel.destroy({
        where: { id },
      });

      if (deletedDetailCount === 0) {
        throw new MaintenanceDetailNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new MaintenanceDetailNotFoundError();
      }

      throw error;
    }
  }
}
