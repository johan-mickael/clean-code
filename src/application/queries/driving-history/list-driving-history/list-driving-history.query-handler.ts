import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import DrivingHistoryDTOMapper from '../../../interfaces/mappers/driving-history.dto-mapper';
import DrivingHistoryRepositoryReader from '../../../ports/repositories/readers/driving-history-repository-reader';
import ListDrivingHistoriesQuery from './list-driving-history.query';

export default class ListDrivingHistoriesQueryHandler {
  constructor(private readonly drivingHistoryRepositoryReader: DrivingHistoryRepositoryReader) {}

  async execute(listDrivingHistoriesQuery: ListDrivingHistoriesQuery): Promise<DrivingHistoryDTO[]> {
    const histories = await this.drivingHistoryRepositoryReader.list();

    return histories.map(DrivingHistoryDTOMapper.toDTO);
  }
}
