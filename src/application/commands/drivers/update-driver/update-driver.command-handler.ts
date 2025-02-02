import DriverDTO from '../../../interfaces/dtos/driver.dto';
import DriverDTOMapper from '../../../interfaces/mappers/driver.dto-mapper';
import DriverRepositoryWriter from '../../../ports/repositories/writers/driver-repository-writer';
import UpdateDriverCommand from './update-driver.command';

export default class UpdateDriverCommandHandler {
  constructor(private readonly driverRepositoryWriter: DriverRepositoryWriter) {}

  async execute(updateDriverCommand: UpdateDriverCommand): Promise<DriverDTO> {
    const { driverId, driverPayload } = updateDriverCommand;
    const { firstname, lastname, profilePicture } = driverPayload;

    const driverDTO = new DriverDTO(driverId, firstname, lastname, profilePicture);

    const updatedDriver = await this.driverRepositoryWriter.update(driverId, driverDTO);

    return DriverDTOMapper.toDTO(updatedDriver);
  }
}
