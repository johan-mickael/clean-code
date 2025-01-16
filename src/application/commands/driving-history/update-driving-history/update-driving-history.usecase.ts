import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import UpdateDrivingHistoryCommand from './update-driving-history.command';

export default abstract class UpdateDrivingHistoryUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateDrivingHistoryCommand: UpdateDrivingHistoryCommand): Promise<DrivingHistoryDTO>;
}
