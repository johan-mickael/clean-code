import { Error as SequelizeError } from 'sequelize';

import BikeDTO from '@triumph/application/interfaces/dtos/bike.dto';
import BikeDTOMapper from '@triumph/application/interfaces/mappers/bike.dto-mapper';
import BikeRepositoryWriter from '@triumph/application/ports/repositories/writers/bike-repository-writer';
import Bike from '@triumph/domain/entity/bike';
import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';

import BikeModel from '../../models/bike.model';

export default class SequelizeBikeRepositoryWriter implements BikeRepositoryWriter {
  async create(bikeDTO: BikeDTO): Promise<Bike> {
    const bikeModel = await BikeModel.create({
      bikeModelId: bikeDTO.bikeModelId,
      partnerId: bikeDTO.partnerId,
      mileage: bikeDTO.mileage,
      status: bikeDTO.status,
      circulationDate: bikeDTO.circulationDate,
    });

    return BikeDTOMapper.toEntity(bikeModel);
  }
  async update(id: string, bikeDTO: BikeDTO): Promise<Bike> {
    try {
      const [affectedBikeCount, updatedBikes] = await BikeModel.update(
        {
          bikeModelId: bikeDTO.bikeModelId,
          partnerId: bikeDTO.partnerId,
          mileage: bikeDTO.mileage,
          status: bikeDTO.status,
          circulationDate: bikeDTO.circulationDate,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );

      if (affectedBikeCount === 0) {
        throw new BikeNotFoundError();
      }

      const updatedBike = updatedBikes[0];
      return BikeDTOMapper.toEntity(updatedBike);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new BikeNotFoundError();
      }

      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const deletedBikeCount = await BikeModel.destroy({
        where: {
          id,
        },
      });

      if (deletedBikeCount === 0) {
        throw new BikeNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new BikeNotFoundError();
      }

      throw error;
    }
  }
}
