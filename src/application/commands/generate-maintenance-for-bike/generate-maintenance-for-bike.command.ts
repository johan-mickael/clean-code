import { Command } from '../common/command';
import { InvalidCommandError } from '../common/invalid-command.error';

type MaintenanceForBikeModelData = {
  bikeId?: string;
};

export default class GenerateMaintenanceForBikeCommand implements Command {
  private constructor(public bikeId: string) {}

  private static preProcessCommandData(maintenanceForBikeData: any): MaintenanceForBikeModelData {
    return {
      bikeId: maintenanceForBikeData.bikeId?.trim(),
    };
  }

  static validateAndCreateCommand(maintenanceForBikeData: any): GenerateMaintenanceForBikeCommand {
    const { bikeId } = this.preProcessCommandData(maintenanceForBikeData);

    if (!bikeId) {
      throw new InvalidCommandError();
    }

    return new GenerateMaintenanceForBikeCommand(bikeId);
  }
}
