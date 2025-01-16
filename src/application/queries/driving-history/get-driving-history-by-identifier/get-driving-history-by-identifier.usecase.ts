import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import GetDrivingHistoryByDriverQuery from './get-driving-history-by-identifier.query';

export default abstract class GetDrivingHistoryByDriverUseCase {
  /**
   * @throws InvalidQueryError
   * @throws DrivingHistoryNotFoundError
   */
  abstract execute(getDrivingHistoryByDriverQuery: GetDrivingHistoryByDriverQuery): Promise<DrivingHistoryDTO[]>;
}
