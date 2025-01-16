import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import DrivingHistoryDTOMapper from '../../../interfaces/mappers/driving-history.dto-mapper';
import DrivingHistoryRepositoryWriter from '../../../ports/repositories/writers/driving-history-repository-writer';
import UpdateDrivingHistoryCommand from './update-driving-history.command';

export default class UpdateDrivingHistoryCommandHandler {
  constructor(private readonly drivingHistoryRepositoryWriter: DrivingHistoryRepositoryWriter) {}

  async execute(updateDrivingHistoryCommand: UpdateDrivingHistoryCommand): Promise<DrivingHistoryDTO> {
    const { drivingHistoryId, drivingHistoryPayload } = updateDrivingHistoryCommand;
    const { driverId, bikeId, label } = drivingHistoryPayload;

    const drivingHistoryDTO = new DrivingHistoryDTO(drivingHistoryId, driverId, bikeId, label);
    const updatedDrivingHistory = await this.drivingHistoryRepositoryWriter.update(drivingHistoryId, drivingHistoryDTO);

    return DrivingHistoryDTOMapper.toDTO(updatedDrivingHistory);
  }
}
