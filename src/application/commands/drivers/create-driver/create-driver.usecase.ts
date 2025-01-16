import DriverDTO from '../../../interfaces/dtos/driver.dto';
import CreateDriverCommand from './create-driver.command';

export default abstract class CreateDriverUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createDriverCommand: CreateDriverCommand): Promise<DriverDTO>;
}
