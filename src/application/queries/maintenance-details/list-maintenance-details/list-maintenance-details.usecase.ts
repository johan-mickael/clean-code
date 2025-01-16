import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import ListMaintenanceDetailsQuery from './list-maintenance-details.query';

export default abstract class ListMaintenanceDetailsUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listMaintenanceDetailsQuery: ListMaintenanceDetailsQuery): Promise<MaintenanceDetailDTO[]>;
}
