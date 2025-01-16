import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import CreateDriverLicenseCommand from './create-driver-license.command';

export default abstract class CreateDriverLicenseUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createDriverLicenseCommand: CreateDriverLicenseCommand): Promise<DriverLicenseDTO>;
}
