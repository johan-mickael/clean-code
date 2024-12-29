import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelModel from '../models/bike-model.model';
import BikeModelRepositoryReader from '@triumph/application/ports/repositories/bike-model-repository-reader';
import { Error as SequelizeError } from 'sequelize';

export default class SequelizeBikeModelRepositoryReader implements BikeModelRepositoryReader {
  async list(): Promise<BikeModel[]> {
    const bikeModels = await BikeModelModel.findAll();

    return bikeModels.map((bikeModel) => new BikeModel(bikeModel.id, bikeModel.name));
  }

  async getById(id: string): Promise<BikeModel | null> {
    try {
      const bikeModel = await BikeModelModel.findByPk(id);

      if (!bikeModel) {
        return null;
      }

      return new BikeModel(bikeModel.id, bikeModel.name);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
