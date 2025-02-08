import { Command } from '../common/command';
import { InvalidCommandError } from '../common/invalid-command.error';

type MaintenanceForBikeModelData = {
  bikeId?: string;
};

export default class CheckDueMaintenanceForBike implements Command {
  private constructor(public bikeId: string) {}

  private static preProcessCommandData(maintenanceForBikeData: any): MaintenanceForBikeModelData {
    return {
      bikeId: maintenanceForBikeData.bikeId?.trim(),
    };
  }

  static validateAndCreateCommand(maintenanceForBikeData: any): CheckDueMaintenanceForBike {
    const { bikeId } = this.preProcessCommandData(maintenanceForBikeData);

    if (!bikeId) {
      throw new InvalidCommandError();
    }

    return new CheckDueMaintenanceForBike(bikeId);
  }
}
