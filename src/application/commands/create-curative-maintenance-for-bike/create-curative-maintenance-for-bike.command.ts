import { Command } from '../common/command';
import { InvalidCommandError } from '../common/invalid-command.error';

type CurativeMaintenanceForBikeModelData = {
  maintenanceLabel?: string;
  bikeId?: string;
  maintenanceDate?: number;
  status?: number;
};

export default class CreateCurativeMaintenanceForBikeCommand implements Command {
  private constructor(
    public maintenanceScheduleLabel: string,
    public bikeModelId: string,
    public maintenanceDate: number,
  ) {}

  private static preProcessCommandData(curativeMaintenanceForBikeData: any): CurativeMaintenanceForBikeModelData {
    return {
      maintenanceLabel: curativeMaintenanceForBikeData.maintenanceLabel?.trim(),
      bikeId: curativeMaintenanceForBikeData.bikeId?.trim(),
      maintenanceDate: curativeMaintenanceForBikeData.maintenanceDate,
    };
  }

  static validateAndCreateCommand(curativeMaintenanceForBikeData: any): CreateCurativeMaintenanceForBikeCommand {
    const { maintenanceLabel, bikeId, maintenanceDate } = this.preProcessCommandData(curativeMaintenanceForBikeData);

    if (!maintenanceLabel || !bikeId || !maintenanceDate) {
      throw new InvalidCommandError();
    }

    return new CreateCurativeMaintenanceForBikeCommand(maintenanceLabel, bikeId, maintenanceDate);
  }
}
