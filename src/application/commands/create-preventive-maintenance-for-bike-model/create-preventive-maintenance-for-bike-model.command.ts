import { Command } from '../common/command';
import { InvalidCommandError } from '../common/invalid-command.error';

type PreventiveMaintenanceForBikeModelData = {
  maintenanceScheduleLabel?: string;
  bikeModelId?: string;
  monthInterval?: number;
  mileageInterval?: number;
};

export default class CreatePreventiveMaintenanceForBikeModelCommand implements Command {
  private constructor(
    public maintenanceScheduleLabel: string,
    public bikeModelId: string,
    public monthInterval?: number,
    public mileageInterval?: number,
  ) {}

  private static preProcessCommandData(
    preventiveMaintenanceForBikeModelData: any,
  ): PreventiveMaintenanceForBikeModelData {
    return {
      maintenanceScheduleLabel: preventiveMaintenanceForBikeModelData.maintenanceScheduleLabel?.trim(),
      bikeModelId: preventiveMaintenanceForBikeModelData.bikeModelId?.trim(),
      monthInterval: preventiveMaintenanceForBikeModelData.monthInterval,
      mileageInterval: preventiveMaintenanceForBikeModelData.mileageInterval,
    };
  }

  static validateAndCreateCommand(
    preventiveMaintenanceForBikeModelData: any,
  ): CreatePreventiveMaintenanceForBikeModelCommand {
    const { maintenanceScheduleLabel, bikeModelId, monthInterval, mileageInterval } = this.preProcessCommandData(
      preventiveMaintenanceForBikeModelData,
    );

    if (!maintenanceScheduleLabel || !bikeModelId) {
      throw new InvalidCommandError();
    }

    return new CreatePreventiveMaintenanceForBikeModelCommand(
      maintenanceScheduleLabel,
      bikeModelId,
      monthInterval,
      mileageInterval,
    );
  }
}
