import { Error as SequelizeError } from 'sequelize';

import SparePartDTO from '@triumph/application/interfaces/dtos/spare-part.dto';
import SparePartDTOMapper from '@triumph/application/interfaces/mappers/spare-part.dto-mapper';
import SparePartRepositoryWriter from '@triumph/application/ports/repositories/writers/spare-part-repository-writer';
import SparePart from '@triumph/domain/entity/spare-part';
import { SparePartNotFoundError } from '@triumph/domain/errors/spare-parts/spare-part-not-found.error';

import SparePartModel from '../../models/spare-part.model';

export default class SequelizeSparePartRepositoryWriter implements SparePartRepositoryWriter {
  async create(sparePartDTO: SparePartDTO): Promise<SparePart> {
    const sparePartModel = await SparePartModel.create({
      name: sparePartDTO.name,
      price: sparePartDTO.price,
      quantity: sparePartDTO.quantity,
    });

    return SparePartDTOMapper.toEntity(sparePartModel);
  }

  async update(id: string, sparePartDTO: SparePartDTO): Promise<SparePart> {
    try {
      const [affectedPartCount, updatedParts] = await SparePartModel.update(
        {
          name: sparePartDTO.name,
          price: sparePartDTO.price,
          quantity: sparePartDTO.quantity,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (affectedPartCount === 0) {
        throw new SparePartNotFoundError();
      }

      const updatedPart = updatedParts[0];
      return SparePartDTOMapper.toEntity(updatedPart);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new SparePartNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedPartCount = await SparePartModel.destroy({
        where: { id },
      });

      if (deletedPartCount === 0) {
        throw new SparePartNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new SparePartNotFoundError();
      }

      throw error;
    }
  }
}
