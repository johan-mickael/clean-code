import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import DrivingHistoryDTOMapper from '../../../interfaces/mappers/driving-history.dto-mapper';
import DrivingHistoryRepositoryWriter from '../../../ports/repositories/writers/driving-history-repository-writer';
import CreateDrivingHistoryCommand from './create-driving-history.command';

export default class CreateDrivingHistoryCommandHandler {
  constructor(private readonly drivingHistoryRepositoryWriter: DrivingHistoryRepositoryWriter) {}

  async execute(createDrivingHistoryCommand: CreateDrivingHistoryCommand): Promise<DrivingHistoryDTO> {
    const { driverId, bikeId, label } = createDrivingHistoryCommand.drivingHistoryPayload;

    const drivingHistoryDTO = new DrivingHistoryDTO(null, driverId, bikeId, label);
    const createdDrivingHistory = await this.drivingHistoryRepositoryWriter.create(drivingHistoryDTO);

    return DrivingHistoryDTOMapper.toDTO(createdDrivingHistory);
  }
}
