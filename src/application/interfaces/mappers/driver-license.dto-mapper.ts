import DriverLicense from '@triumph/domain/entity/driver-license';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';

import DriverLicenseDTO from '../dtos/driver-license.dto';

export default class DriverLicenseDTOMapper {
  static toDTO(driverLicenseEntity: DriverLicense): DriverLicenseDTO {
    return new DriverLicenseDTO(
      driverLicenseEntity.id,
      driverLicenseEntity.driverId,
      driverLicenseEntity.licenseNumber,
      driverLicenseEntity.issueDate,
      driverLicenseEntity.expiryDate,
      driverLicenseEntity.licenseClass,
      driverLicenseEntity.stateIssued,
      driverLicenseEntity.isActive,
    );
  }

  static toEntity(driverLicenseDTO: DriverLicenseDTO): DriverLicense {
    const { id, driverId, licenseNumber, issueDate, expiryDate, licenseClass, stateIssued, isActive } =
      driverLicenseDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new DriverLicense(id, driverId, licenseNumber, issueDate, expiryDate, licenseClass, stateIssued, isActive);
  }
}
