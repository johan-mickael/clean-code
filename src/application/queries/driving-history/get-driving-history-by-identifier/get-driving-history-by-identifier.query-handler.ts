import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import DrivingHistoryDTOMapper from '../../../interfaces/mappers/driving-history.dto-mapper';
import DrivingHistoryRepositoryReader from '../../../ports/repositories/readers/driving-history-repository-reader';
import GetDrivingHistoryByIdQuery from './get-driving-history-by-identifier.query';
import { DrivingHistoryNotFoundError } from '@triumph/domain/errors/driving-history/driving-history-not-found.error';

export default class GetDrivingHistoryByIdQueryHandler {
  constructor(private readonly drivingHistoryRepository: DrivingHistoryRepositoryReader) {}

  async execute(getDrivingHistoryByIdQuery: GetDrivingHistoryByIdQuery): Promise<DrivingHistoryDTO> {
    const historyIdInput = getDrivingHistoryByIdQuery.id;
    const foundHistory = await this.drivingHistoryRepository.getById(historyIdInput);

    if (foundHistory !== null) {
      return DrivingHistoryDTOMapper.toDTO(foundHistory);
    }

    throw new DrivingHistoryNotFoundError();
  }
}
