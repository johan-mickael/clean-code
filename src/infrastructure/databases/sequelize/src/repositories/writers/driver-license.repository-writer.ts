import { Error as SequelizeError } from 'sequelize';

import DriverLicenseDTO from '@triumph/application/interfaces/dtos/driver-license.dto';
import DriverLicenseDTOMapper from '@triumph/application/interfaces/mappers/driver-license.dto-mapper';
import DriverLicenseRepositoryWriter from '@triumph/application/ports/repositories/writers/driver-license-repository-writer';
import DriverLicense from '@triumph/domain/entity/driver-license';
import { DriverLicenseNotFoundError } from '@triumph/domain/errors/driver-licenses/driver-license-not-found.error';

import DriverLicenseModel from '../../models/driver-licence.model';

export default class SequelizeDriverLicenseRepositoryWriter implements DriverLicenseRepositoryWriter {
  async create(driverLicenseDTO: DriverLicenseDTO): Promise<DriverLicense> {
    const licenseModel = await DriverLicenseModel.create({
      driverId: driverLicenseDTO.driverId,
      licenseNumber: driverLicenseDTO.licenseNumber,
      issueDate: driverLicenseDTO.issueDate,
      expiryDate: driverLicenseDTO.expiryDate,
      licenseClass: driverLicenseDTO.licenseClass,
      stateIssued: driverLicenseDTO.stateIssued,
      isActive: driverLicenseDTO.isActive,
    });

    return DriverLicenseDTOMapper.toEntity(licenseModel);
  }

  async update(id: string, driverLicenseDTO: DriverLicenseDTO): Promise<DriverLicense> {
    try {
      const [affectedLicenseCount, updatedLicenses] = await DriverLicenseModel.update(
        {
          driverId: driverLicenseDTO.driverId,
          licenseNumber: driverLicenseDTO.licenseNumber,
          issueDate: driverLicenseDTO.issueDate,
          expiryDate: driverLicenseDTO.expiryDate,
          licenseClass: driverLicenseDTO.licenseClass,
          stateIssued: driverLicenseDTO.stateIssued,
          isActive: driverLicenseDTO.isActive,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (affectedLicenseCount === 0) {
        throw new DriverLicenseNotFoundError();
      }

      const updatedLicense = updatedLicenses[0];
      return DriverLicenseDTOMapper.toEntity(updatedLicense);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new DriverLicenseNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedLicenseCount = await DriverLicenseModel.destroy({
        where: { id },
      });

      if (deletedLicenseCount === 0) {
        throw new DriverLicenseNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new DriverLicenseNotFoundError();
      }

      throw error;
    }
  }
}
