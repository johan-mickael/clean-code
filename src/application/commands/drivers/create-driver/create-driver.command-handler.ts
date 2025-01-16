import DriverDTO from '../../../interfaces/dtos/driver.dto';
import DriverDTOMapper from '../../../interfaces/mappers/driver.dto-mapper';
import DriverRepositoryWriter from '../../../ports/repositories/writers/driver-repository-writer';
import CreateDriverCommand from './create-driver.command';

export default class CreateDriverCommandHandler {
  constructor(private readonly driverRepositoryWriter: DriverRepositoryWriter) {}

  async execute(createDriverCommand: CreateDriverCommand): Promise<DriverDTO> {
    const { firstname, lastname, profilePicture } = createDriverCommand.driverPayload;

    const driverDTO = new DriverDTO(
      null,
      firstname,
      lastname,
      profilePicture
    );
    
    const createdDriver = await this.driverRepositoryWriter.create(driverDTO);

    return DriverDTOMapper.toDTO(createdDriver);
  }
}
