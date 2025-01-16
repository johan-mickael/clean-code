import DriverDTO from '../../../interfaces/dtos/driver.dto';
import GetDriverByIdentifierQuery from './get-driver-by-identifier.query';

export default abstract class GetDriverByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws DriverNotFoundError
   */
  abstract execute(getDriverByIdentifierQuery: GetDriverByIdentifierQuery): Promise<DriverDTO>;
}
