import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import GetMaintenanceByIdentifierQuery from './get-maintenance-by-identifier.query';

export default abstract class GetMaintenanceByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws MaintenanceNotFoundError
   */
  abstract execute(getMaintenanceByIdentifierQuery: GetMaintenanceByIdentifierQuery): Promise<MaintenanceDTO>;
}
