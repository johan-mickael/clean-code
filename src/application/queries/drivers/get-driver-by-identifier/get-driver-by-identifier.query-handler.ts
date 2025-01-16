import DriverDTO from '../../../interfaces/dtos/driver.dto';
import DriverDTOMapper from '../../../interfaces/mappers/driver.dto-mapper';
import DriverRepositoryReader from '../../../ports/repositories/readers/driver-repository-reader';
import GetDriverByIdQuery from './get-driver-by-identifier.query';
import { DriverNotFoundError } from '@triumph/domain/errors/drivers/driver-not-found.error';

export default class GetDriverByIdQueryHandler {
  constructor(private readonly driverRepository: DriverRepositoryReader) {}

  async execute(getDriverByIdQuery: GetDriverByIdQuery): Promise<DriverDTO> {
    const driverIdInput = getDriverByIdQuery.id;
    const foundDriver = await this.driverRepository.getById(driverIdInput);

    if (foundDriver !== null) {
      return DriverDTOMapper.toDTO(foundDriver);
    }

    throw new DriverNotFoundError();
  }
}
