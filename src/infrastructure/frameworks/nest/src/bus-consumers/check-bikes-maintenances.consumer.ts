import SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand from '@triumph/application/commands/send-notification-to-partner-for-bike-awaiting-for-a-maintenance/send-notification-to-partner-for-bike-awaiting-for-a-maintenance.command';
import SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase from '@triumph/application/commands/send-notification-to-partner-for-bike-awaiting-for-a-maintenance/send-notification-to-partner-for-bike-awaiting-for-a-maintenance.usecase';
import BusConsumer from '@triumph/application/ports/message-broker/bus-consumer.interface';
import { Event } from '@triumph/domain/events/event.interface';
import CheckBikesMaintenancesEvent from '@triumph/domain/events/maintenances/check-bikes-maintenances.event';

export default class CheckBikesMaintenancesConsumer implements BusConsumer {
  constructor(
    private readonly sendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase: SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase,
  ) {}

  getEvent(): Event {
    return new CheckBikesMaintenancesEvent();
  }

  consume(message: any): void {
    const bikeIds = message.data;

    for (const bikeId of bikeIds) {
      const command = SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand.validateAndCreateCommand({
        bikeId,
        label: 'label',
      });

      this.sendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase.execute(command);
    }
  }
}
