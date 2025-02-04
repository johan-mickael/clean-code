import * as amqp from 'amqplib';

import { Event } from '@triumph/domain/events/event.interface';

import BusConsumer from './bus-consumer.interface';

export default abstract class BusEmitter {
  abstract connect(): Promise<BusEmitter>;
  abstract disconnect(): Promise<void>;

  abstract emit(event: Event): Promise<void>;

  abstract createQueue(
    exchangeName: string,
    exchangeType: string,
    queueName: string,
    routingKey?: string,
    exchangeOptions?: amqp.Options.AssertExchange,
    queueOptions?: amqp.Options.AssertQueue,
  ): Promise<void>;

  abstract consume(
    queueName: string,
    callback: (message: any) => void,
    routingKey?: string,
    exchangeName?: string,
    exchangeType?: string,
    exchangeOptions?: amqp.Options.AssertExchange,
  ): Promise<void>;

  abstract deleteQueue(queueName: string): Promise<void>;
  abstract deleteExchange(exchangeName: string): Promise<void>;

  abstract run(consumers: BusConsumer[]): Promise<void>;
}
