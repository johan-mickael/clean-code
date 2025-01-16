import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import ListDrivingHistoryQuery from './list-driving-history.query';

export default abstract class ListDrivingHistoryUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listDrivingHistoryQuery: ListDrivingHistoryQuery): Promise<DrivingHistoryDTO[]>;
}
