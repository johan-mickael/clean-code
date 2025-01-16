import { Error as SequelizeError } from 'sequelize';

import DriverDTO from '@triumph/application/interfaces/dtos/driver.dto';
import DriverDTOMapper from '@triumph/application/interfaces/mappers/driver.dto-mapper';
import DriverRepositoryWriter from '@triumph/application/ports/repositories/writers/driver-repository-writer';
import Driver from '@triumph/domain/entity/driver';
import { DriverNotFoundError } from '@triumph/domain/errors/drivers/driver-not-found.error';

import DriverModel from '../../models/driver.model';

export default class SequelizeDriverRepositoryWriter implements DriverRepositoryWriter {
  async create(driverDTO: DriverDTO): Promise<Driver> {
    const driverModel = await DriverModel.create({
      firstname: driverDTO.firstname,
      lastname: driverDTO.lastname,
      profilePicture: driverDTO.profilePicture,
    });

    return DriverDTOMapper.toEntity(driverModel);
  }

  async update(id: string, driverDTO: DriverDTO): Promise<Driver> {
    try {
      const [affectedDriverCount, updatedDrivers] = await DriverModel.update(
        {
          firstname: driverDTO.firstname,
          lastname: driverDTO.lastname,
          profilePicture: driverDTO.profilePicture,
        },
        {
          where: {
            id,
          },
          returning: true,
        },
      );

      if (affectedDriverCount === 0) {
        throw new DriverNotFoundError();
      }

      const updatedDriver = updatedDrivers[0];
      return DriverDTOMapper.toEntity(updatedDriver);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new DriverNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedDriverCount = await DriverModel.destroy({
        where: {
          id,
        },
      });

      if (deletedDriverCount === 0) {
        throw new DriverNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new DriverNotFoundError();
      }

      throw error;
    }
  }
}
