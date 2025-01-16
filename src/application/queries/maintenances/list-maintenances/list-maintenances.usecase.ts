import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import ListMaintenancesQuery from './list-maintenances.query';

export default abstract class ListMaintenancesUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listMaintenancesQuery: ListMaintenancesQuery): Promise<MaintenanceDTO[]>;
}
