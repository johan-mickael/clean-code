import DriverDTO from '../../../interfaces/dtos/driver.dto';
import ListDriversQuery from './list-drivers.query';

export default abstract class ListDriversUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listDriversQuery: ListDriversQuery): Promise<DriverDTO[]>;
}
