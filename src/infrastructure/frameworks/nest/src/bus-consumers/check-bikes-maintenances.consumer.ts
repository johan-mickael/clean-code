import SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand from '@triumph/application/commands/send-notification-to-partner-for-bike-awaiting-for-a-maintenance/send-notification-to-partner-for-bike-awaiting-for-a-maintenance.command';
import SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase from '@triumph/application/commands/send-notification-to-partner-for-bike-awaiting-for-a-maintenance/send-notification-to-partner-for-bike-awaiting-for-a-maintenance.usecase';
import BusConsumer from '@triumph/application/ports/message-broker/bus-consumer.interface';
import { Event } from '@triumph/domain/events/event.interface';
import ScheduledMaintenanceForBikeCreatedEvent from '@triumph/domain/events/maintenances/scheduled-maintenance-for-bike-created.event';

export default class CheckBikesMaintenancesConsumer implements BusConsumer {
  constructor(
    private readonly sendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase: SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase,
  ) {}

  getEvent(): Event {
    return new ScheduledMaintenanceForBikeCreatedEvent();
  }

  consume(message: any): void {
    const { label, bikeId } = message.data;

    const command = SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand.validateAndCreateCommand({
      bikeId,
      label: label,
    });

    this.sendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase.execute(command);
  }
}
