import { Event } from '../event.interface';

export default class CheckBikesMaintenancesEvent implements Event {
  private payload?: string[];

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
    return 'check_bikes_maintenances_queue';
  }

  getRoutingKey(): string {
    return 'check_bikes_maintenances_queue.request';
  }

  getEventName(): string {
    return 'check_bikes_maintenances_queue.request';
  }

  getEventPayload(): string[] | undefined {
    return this.payload;
  }

  setPayload(payload: string[]): CheckBikesMaintenancesEvent {
    this.payload = payload;
    return this;
  }
}
