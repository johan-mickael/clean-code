export abstract class Event {
  abstract getEventName(): string;
  abstract getEventPayload(): any;
  abstract getExchangeName(): string;
  abstract getExchangeType(): string;
  abstract getExchangeOptions(): any;
  abstract getQueueName(): string;
  abstract getRoutingKey(): string;
}
