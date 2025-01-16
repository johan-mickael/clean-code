import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import DriverLicenseDTOMapper from '../../../interfaces/mappers/driver-license.dto-mapper';
import DriverLicenseRepositoryWriter from '../../../ports/repositories/writers/driver-license-repository-writer';
import CreateDriverLicenseCommand from './create-driver-license.command';

export default class CreateDriverLicenseCommandHandler {
  constructor(private readonly driverLicenseRepositoryWriter: DriverLicenseRepositoryWriter) {}

  async execute(createDriverLicenseCommand: CreateDriverLicenseCommand): Promise<DriverLicenseDTO> {
    const { licenseNumber, issueDate, expiryDate, licenseClass, stateIssued, isActive, driverId } = createDriverLicenseCommand.driverLicensePayload;
    const driverLicenseDTO = new DriverLicenseDTO(
      null,
      driverId,
      licenseNumber,
      issueDate,
      expiryDate,
      licenseClass,
      stateIssued,
      isActive,
    );
    const createdDriverLicense = await this.driverLicenseRepositoryWriter.create(driverLicenseDTO);
    return DriverLicenseDTOMapper.toDTO(createdDriverLicense);
  }
}
