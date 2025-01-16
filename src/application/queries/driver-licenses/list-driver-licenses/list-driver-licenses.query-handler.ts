import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import DriverLicenseDTOMapper from '../../../interfaces/mappers/driver-license.dto-mapper';
import DriverLicenseRepositoryReader from '../../../ports/repositories/readers/driver-license-repository-reader';
import ListDriverLicensesQuery from './list-driver-licenses.query';

export default class ListDriverLicensesQueryHandler {
  constructor(private readonly driverLicenseRepositoryReader: DriverLicenseRepositoryReader) {}

  async execute(listDriverLicensesQuery: ListDriverLicensesQuery): Promise<DriverLicenseDTO[]> {
    const licenses = await this.driverLicenseRepositoryReader.list();

    return licenses.map(DriverLicenseDTOMapper.toDTO);
  }
}
