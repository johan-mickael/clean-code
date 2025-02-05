import Maintenance from '@triumph/domain/entity/maintenance/maintenance';

import GenerateMaintenanceForBikeCommand from './generate-maintenance-for-bike.command';

export default abstract class GenerateMaintenanceForBikeUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(
    generateMaintenanceForBikeCommand: GenerateMaintenanceForBikeCommand,
  ): Promise<Maintenance | undefined>;
}
