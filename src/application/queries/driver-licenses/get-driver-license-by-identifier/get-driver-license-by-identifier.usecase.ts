import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import GetDriverLicenseByIdentifierQuery from './get-driver-license-by-identifier.query';

export default abstract class GetDriverLicenseByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws DriverLicenseNotFoundError
   */
  abstract execute(getDriverLicenseByIdentifierQuery: GetDriverLicenseByIdentifierQuery): Promise<DriverLicenseDTO>;
}
