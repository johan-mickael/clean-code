import * as amqp from 'amqplib';

export default abstract class BusEmitter {
  abstract connect(): Promise<BusEmitter>;
  abstract disconnect(): Promise<void>;

  abstract emit(
    eventName: string,
    data: any,
    routingKey?: string,
    exchangeName?: string,
    exchangeType?: 'direct' | 'fanout' | 'topic' | 'headers',
    exchangeOptions?: amqp.Options.AssertExchange,
  ): Promise<void>;

  abstract createQueue(
    queueName: string,
    exchangeName?: string,
    routingKey?: string,
    exchangeType?: 'direct' | 'fanout' | 'topic' | 'headers',
    queueOptions?: amqp.Options.AssertQueue,
  ): Promise<void>;

  abstract consume(
    queueName: string,
    callback: (message: any) => void,
    options?: {
      noAck?: boolean; // Auto-acknowledge messages
      prefetch?: number; // Limit the number of unacknowledged messages
    },
  ): Promise<void>;

  abstract deleteQueue(queueName: string): Promise<void>;
  abstract deleteExchange(exchangeName: string): Promise<void>;
}
