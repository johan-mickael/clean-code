import { Command } from '../common/command';
import { InvalidCommandError } from '../common/invalid-command.error';

type SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandData = {
  bikeId: string;
  label: string;
};

export default class SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand implements Command {
  private constructor(public data: SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandData) {}

  private static preProcessCommandData(
    data: SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandData,
  ): SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandData {
    return {
      bikeId: data.bikeId.trim(),
      label: data.label.trim(),
    };
  }

  static validateAndCreateCommand(
    data: SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandData,
  ): SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand {
    const { bikeId, label } = this.preProcessCommandData(data);

    if (!bikeId || !label) {
      throw new InvalidCommandError();
    }

    return new SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand({
      bikeId,
      label,
    });
  }
}
