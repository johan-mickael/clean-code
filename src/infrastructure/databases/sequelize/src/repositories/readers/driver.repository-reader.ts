import { Error as SequelizeError } from 'sequelize';

import DriverRepositoryReader from '@triumph/application/ports/repositories/readers/driver-repository-reader';
import Driver from '@triumph/domain/entity/driver';

import DriverModel from '../../models/driver.model';

export default class SequelizeDriverRepository implements DriverRepositoryReader {
  async list(): Promise<Driver[]> {
    const drivers = await DriverModel.findAll();

    return drivers.map(
      (driver) => new Driver(driver.id, driver.firstname, driver.lastname, driver.profilePicture),
    );
  }

  async getById(id: string): Promise<Driver | null> {
    try {
      const driver = await DriverModel.findByPk(id);

      if (!driver) {
        return null;
      }

      return new Driver(driver.id, driver.firstname, driver.lastname, driver.profilePicture);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
