import Maintenance from '../../entity/maintenance/maintenance';
import { Event } from '../event.interface';

export default class MaintenanceCreatedEvent implements Event {
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
    return 'maintenance_queue';
  }

  getRoutingKey(): string {
    return 'maintenance.created';
  }

  getEventName(): string {
    return 'maintenance.created';
  }

  getEventPayload(): Maintenance | undefined {
    return this.payload;
  }

  setPayload(payload: Maintenance): MaintenanceCreatedEvent {
    this.payload = payload;
    return this;
  }
}
