import Maintenance from '../../entity/maintenance/maintenance';
import { Event } from '../event.interface';

export default class ScheduledMaintenanceForBikeCreatedEvent implements Event {
  private payload?: Maintenance;

  getExchangeName(): string {
    return 'maintenance_exchange';
  }

  getExchangeType(): string {
    return 'direct';
  }

  getExchangeOptions(): any {
    return { durable: false };
  }

  getQueueName(): string {
    return 'scheduled_maintenance_for_bike_queue';
  }

  getRoutingKey(): string {
    return 'scheduled-maintenance-for-bike.created';
  }

  getEventName(): string {
    return 'scheduled-maintenance-for-bike.created';
  }

  getEventPayload(): Maintenance | undefined {
    return this.payload;
  }

  setPayload(payload: Maintenance): ScheduledMaintenanceForBikeCreatedEvent {
    this.payload = payload;
    return this;
  }
}
