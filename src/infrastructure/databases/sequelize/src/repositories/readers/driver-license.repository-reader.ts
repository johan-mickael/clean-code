import { Error as SequelizeError } from 'sequelize';

import DriverLicenseRepositoryReader from '@triumph/application/ports/repositories/readers/driver-license-repository-reader';
import DriverLicense from '@triumph/domain/entity/driver-license';

import DriverLicenseModel from '../../models/driver-licence.model';

export default class SequelizeDriverLicenseRepository implements DriverLicenseRepositoryReader {
  async list(): Promise<DriverLicense[]> {
    const licenses = await DriverLicenseModel.findAll();

    return licenses.map(
      (license) => new DriverLicense(license.id, license.driverId, license.licenseNumber, license.issueDate, license.expiryDate, license.licenseClass, license.stateIssued, license.isActive),
    );
  }

  async getById(id: string): Promise<DriverLicense | null> {
    try {
      const license = await DriverLicenseModel.findByPk(id);

      if (!license) {
        return null;
      }

      return new DriverLicense(license.id, license.driverId, license.licenseNumber, license.issueDate, license.expiryDate, license.licenseClass, license.stateIssued, license.isActive);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
