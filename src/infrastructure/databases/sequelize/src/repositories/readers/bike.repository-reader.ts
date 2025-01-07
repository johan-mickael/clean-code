import { Error as SequelizeError } from 'sequelize';

import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import Bike from '@triumph/domain/entity/bike';

import BikeModel from '../../models/bike.model';

export default class SequelizeBikeRepository implements BikeRepositoryReader {
  async list(): Promise<Bike[]> {
    const bikes = await BikeModel.findAll();

    return bikes.map(
      (bike) => new Bike(bike.id, bike.bikeModelId, bike.partnerId, bike.mileage, bike.status, bike.circulationDate),
    );
  }

  async getById(id: string): Promise<Bike | null> {
    try {
      const bike = await BikeModel.findByPk(id);

      if (!bike) {
        return null;
      }

      return new Bike(bike.id, bike.bikeModelId, bike.partnerId, bike.mileage, bike.status, bike.circulationDate);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
