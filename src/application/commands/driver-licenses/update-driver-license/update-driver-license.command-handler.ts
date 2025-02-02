import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import DriverLicenseDTOMapper from '../../../interfaces/mappers/driver-license.dto-mapper';
import DriverLicenseRepositoryWriter from '../../../ports/repositories/writers/driver-license-repository-writer';
import UpdateDriverLicenseCommand from './update-driver-license.command';

export default class UpdateDriverLicenseCommandHandler {
  constructor(private readonly driverLicenseRepositoryWriter: DriverLicenseRepositoryWriter) {}

  async execute(updateDriverLicenseCommand: UpdateDriverLicenseCommand): Promise<DriverLicenseDTO> {
    const { driverLicenseId, driverLicensePayload } = updateDriverLicenseCommand;
    const { licenseNumber, issueDate, expiryDate, licenseClass, stateIssued, isActive, driverId } =
      driverLicensePayload;
    const driverLicenseDTO = new DriverLicenseDTO(
      driverLicenseId,
      driverId,
      licenseNumber,
      issueDate,
      expiryDate,
      licenseClass,
      stateIssued,
      isActive,
    );
    const updatedDriverLicense = await this.driverLicenseRepositoryWriter.update(driverLicenseId, driverLicenseDTO);
    return DriverLicenseDTOMapper.toDTO(updatedDriverLicense);
  }
}
