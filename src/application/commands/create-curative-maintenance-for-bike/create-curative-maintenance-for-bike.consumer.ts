import { Event } from '@triumph/domain/events/event.interface';
import MaintenanceCreatedEvent from '@triumph/domain/events/maintenances/maintenance-created.event';

import BusConsumer from '../../ports/message-broker/bus-consumer.interface';

export default class CreateCurativeMaintenanceForBikeConsumer implements BusConsumer {
  getEvent(): Event {
    return new MaintenanceCreatedEvent();
  }

  consume(message: any): void {
    console.log('Creating curative maintenance for bike:', message);
  }
}
