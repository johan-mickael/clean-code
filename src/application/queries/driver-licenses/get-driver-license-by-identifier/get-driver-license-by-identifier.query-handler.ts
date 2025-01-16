import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import DriverLicenseDTOMapper from '../../../interfaces/mappers/driver-license.dto-mapper';
import DriverLicenseRepositoryReader from '../../../ports/repositories/readers/driver-license-repository-reader';
import GetDriverLicenseByIdQuery from './get-driver-license-by-identifier.query';
import { DriverLicenseNotFoundError } from '@triumph/domain/errors/driver-licenses/driver-license-not-found.error';

export default class GetDriverLicenseByIdQueryHandler {
  constructor(private readonly driverLicenseRepository: DriverLicenseRepositoryReader) {}

  async execute(getDriverLicenseByIdQuery: GetDriverLicenseByIdQuery): Promise<DriverLicenseDTO> {
    const driverLicenseIdInput = getDriverLicenseByIdQuery.id;
    const foundDriverLicense = await this.driverLicenseRepository.getById(driverLicenseIdInput);

    if (foundDriverLicense !== null) {
      return DriverLicenseDTOMapper.toDTO(foundDriverLicense);
    }

    throw new DriverLicenseNotFoundError();
  }
}
