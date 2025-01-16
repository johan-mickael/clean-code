import DriverDTO from '../../../interfaces/dtos/driver.dto';
import DriverDTOMapper from '../../../interfaces/mappers/driver.dto-mapper';
import DriverRepositoryReader from '../../../ports/repositories/readers/driver-repository-reader';
import ListDriversQuery from './list-drivers.query';

export default class ListDriversQueryHandler {
  constructor(private readonly driverRepositoryReader: DriverRepositoryReader) {}

  async execute(listDriversQuery: ListDriversQuery): Promise<DriverDTO[]> {
    const drivers = await this.driverRepositoryReader.list();

    return drivers.map(DriverDTOMapper.toDTO);
  }
}
