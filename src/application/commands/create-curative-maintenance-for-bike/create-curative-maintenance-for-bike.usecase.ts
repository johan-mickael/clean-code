import Maintenance from '@triumph/domain/entity/maintenance/maintenance';

import CreateCurativeMaintenanceForBikeCommand from './create-curative-maintenance-for-bike.command';

export default abstract class CreateCurativeMaintenanceForBikeUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(
    createCreativeMaintenanceForBikeCommand: CreateCurativeMaintenanceForBikeCommand,
  ): Promise<Maintenance>;
}
