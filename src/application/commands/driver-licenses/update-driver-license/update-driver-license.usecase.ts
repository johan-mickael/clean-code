import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import UpdateDriverLicenseCommand from './update-driver-license.command';

export default abstract class UpdateDriverLicenseUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateDriverLicenseCommand: UpdateDriverLicenseCommand): Promise<DriverLicenseDTO>;
}
