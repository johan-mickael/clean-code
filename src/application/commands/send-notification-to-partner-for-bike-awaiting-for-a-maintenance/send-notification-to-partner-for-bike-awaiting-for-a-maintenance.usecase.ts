import SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand from './send-notification-to-partner-for-bike-awaiting-for-a-maintenance.command';

export default abstract class SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(
    sendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand: SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand,
  ): Promise<boolean>;
}
