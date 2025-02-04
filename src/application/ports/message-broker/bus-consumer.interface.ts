import { Event } from '@triumph/domain/events/event.interface';

export default abstract class BusConsumer {
  abstract getEvent(): Event;
  abstract consume(message: any): void;
}
