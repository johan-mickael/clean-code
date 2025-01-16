import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import GetMaintenanceDetailByIdentifierQuery from './get-maintenance-detail-by-identifier.query';

export default abstract class GetMaintenanceDetailByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws MaintenanceDetailNotFoundError
   */
  abstract execute(getMaintenanceDetailByIdentifierQuery: GetMaintenanceDetailByIdentifierQuery): Promise<MaintenanceDetailDTO>;
}
