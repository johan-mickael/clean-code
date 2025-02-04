import { Event } from '@triumph/domain/events/event.interface';
import MaintenanceScheduleCreatedEvent from '@triumph/domain/events/maintenances/maintenance-schedule-created.event';

import BusConsumer from '../../ports/message-broker/bus-consumer.interface';

export default class CreatePreventiveMaintenanceForBikeModelConsumer implements BusConsumer {
  getEvent(): Event {
    return new MaintenanceScheduleCreatedEvent();
  }

  consume(message: any): void {
    console.log('Creating preventive maintenance for bike model:', message);
  }
}
