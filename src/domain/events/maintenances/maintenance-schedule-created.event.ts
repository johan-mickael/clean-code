import { MaintenanceSchedule } from '../../entity/maintenance_schedules';
import { Event } from '../event.interface';

export default class MaintenanceScheduleCreatedEvent implements Event {
  private payload: MaintenanceSchedule | undefined;

  getExchangeName(): string {
    return 'maintenance-exchange';
  }
  getExchangeType(): string {
    return 'direct';
  }
  getExchangeOptions(): any {
    return { durable: false };
  }
  getQueueName(): string {
    return 'maintenance-schedule-queue';
  }
  getRoutingKey(): string {
    return 'maintenance-schedule.created';
  }
  getEventName(): string {
    return 'maintenance-schedule.created';
  }
  getEventPayload(): MaintenanceSchedule | undefined {
    return this.payload;
  }
  setPayload(payload: MaintenanceSchedule): MaintenanceScheduleCreatedEvent {
    this.payload = payload;
    return this;
  }
}
