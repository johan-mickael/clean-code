import Maintenance from '@triumph/domain/entity/maintenance/maintenance';

import CheckDueMaintenanceForBike from './check-due-maintenance-for-bike.command';

export default abstract class CheckDueMaintenanceForBikeUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(generateMaintenanceForBikeCommand: CheckDueMaintenanceForBike): Promise<Maintenance | undefined>;
}
