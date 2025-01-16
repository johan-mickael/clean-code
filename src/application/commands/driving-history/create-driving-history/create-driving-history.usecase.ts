import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import CreateDrivingHistoryCommand from './create-driving-history.command';

export default abstract class CreateDrivingHistoryUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createDrivingHistoryCommand: CreateDrivingHistoryCommand): Promise<DrivingHistoryDTO>;
}
