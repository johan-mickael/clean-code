import DriverDTO from '../../../interfaces/dtos/driver.dto';
import UpdateDriverCommand from './update-driver.command';

export default abstract class UpdateDriverUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateDriverCommand: UpdateDriverCommand): Promise<DriverDTO>;
}
