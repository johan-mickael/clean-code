import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import ListDriverLicensesQuery from './list-driver-licenses.query';

export default abstract class ListDriverLicensesUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listDriverLicensesQuery: ListDriverLicensesQuery): Promise<DriverLicenseDTO[]>;
}
