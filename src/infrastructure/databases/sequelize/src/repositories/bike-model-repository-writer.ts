import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelModel from '../models/bike-model.model';
import BikeModelRepositoryWriter from '@triumph/application/ports/repositories/bike-model-repository-writer';
import BikeModelDTO from '@triumph/application/interfaces/dtos/bike-model-dto';
import BikeModelDTOMapper from '@triumph/application/interfaces/mappers/bike-model-dto-mapper';
import { BikeModelNotFoundError } from '@triumph/domain/errors/bike-models/bike-model-not-found-error';
import { Error as SequelizeError } from 'sequelize';

export default class SequelizeBikeModelRepositoryWriter implements BikeModelRepositoryWriter {
  async create(bikeModelDTO: BikeModelDTO): Promise<BikeModel> {
    const bikeModelModel = await BikeModelModel.create({
      name: bikeModelDTO.name,
    });

    return BikeModelDTOMapper.toEntity(bikeModelModel);
  }
  async update(id: string, bikeModelDTO: BikeModelDTO): Promise<BikeModel> {
    try {
      const [affectedBikeModelCount, updatedBikeModels] = await BikeModelModel.update(
        {
          name: bikeModelDTO.name,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );

      if (affectedBikeModelCount === 0) {
        throw new BikeModelNotFoundError();
      }

      const updatedBikeModel = updatedBikeModels[0];
      return BikeModelDTOMapper.toEntity(updatedBikeModel);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new BikeModelNotFoundError();
      }

      throw error;
    }
  }
  async delete(id: string): Promise<void> {
    try {
      await BikeModelModel.destroy({
        where: {
          id,
        },
      });

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new BikeModelNotFoundError();
      }

      throw error;
    }
  }
}
