import * as amqp from 'amqplib';

import BusConsumer from '@triumph/application/ports/message-broker/bus-consumer.interface';
import BusEmitter from '@triumph/application/ports/message-broker/bus-emitter.interface';
import { Event } from '@triumph/domain/events/event.interface';

type ExchangeType = 'direct' | 'fanout' | 'topic' | 'headers';
type ExchangeParameterType = { exchangeName: string; exchangeType: ExchangeType };

export default class RabbitMQEmitter implements BusEmitter {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private readonly rabbitUrl: string;

  private DEFAULT_EXCHANGE_NAME = 'triumph';
  private DEFAULT_EXCHANGE_TYPE = 'fanout';
  private DEFAULT_EXCHANGE_OPTIONS = { durable: false };

  private DIRECT_EXCHANGE_NAME = 'triumph.direct';
  private DIRECT_EXCHANGE_TYPE = 'direct';

  constructor() {
    this.rabbitUrl = process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672';
  }

  private async ensureChannel(): Promise<void> {
    if (!this.channel) {
      throw new Error('RabbitMQ channel is not available. Ensure you are connected.');
    }
  }

  async connect(): Promise<BusEmitter> {
    try {
      this.connection = await amqp.connect(this.rabbitUrl);
      this.channel = await this.connection.createChannel();
      this.connection.on('error', (err) => {
        console.error('RabbitMQ Connection Error:', err);
      });

      this.connection.on('close', () => {
        console.warn('RabbitMQ connection closed. Attempting to reconnect...');
        setTimeout(() => this.connect(), 5000); // Retry after 5 seconds
      });

      return this;
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
        console.log('RabbitMQ channel closed');
      }

      if (this.connection) {
        await this.connection.close();
        this.connection = null;
        console.log('RabbitMQ connection closed');
      }
    } catch (error) {
      console.error('Failed to disconnect from RabbitMQ:', error);
    }
  }

  async emit(event: Event): Promise<void> {
    await this.ensureChannel();

    try {
      await this.channel!.assertExchange(event.getExchangeName(), event.getExchangeType(), event.getExchangeOptions());

      this.channel!.publish(
        event.getExchangeName(),
        event.getRoutingKey(),
        Buffer.from(
          JSON.stringify({
            event: event.getEventName(),
            data: event.getEventPayload(),
          }),
        ),
      );
    } catch (error) {
      console.error('Failed to emit event:', error);
      throw error;
    }
  }

  async createQueue(
    exchangeName: string,
    exchangeType: string,
    queueName: string,
    routingKey: string = '',
    exchangeOptions: amqp.Options.AssertExchange = this.DEFAULT_EXCHANGE_OPTIONS,
  ): Promise<void> {
    await this.ensureChannel();

    if (!this.channel) {
      throw new Error('Channel is not available');
    }

    try {
      await this.channel.assertExchange(exchangeName, exchangeType, exchangeOptions);
      await this.channel.assertQueue(queueName, { durable: true, autoDelete: false });
      await this.channel.bindQueue(queueName, exchangeName, routingKey);
    } catch (error) {
      console.error('Failed to create queue:', error);
      throw error;
    }
  }

  async consume(
    queueName: string,
    callback: (message: any) => void,
    routingKey: string = '',
    exchangeName: string = this.DEFAULT_EXCHANGE_NAME,
    exchangeType: string = this.DEFAULT_EXCHANGE_TYPE,
    exchangeOptions: amqp.Options.AssertExchange = this.DEFAULT_EXCHANGE_OPTIONS,
  ): Promise<void> {
    await this.ensureChannel();

    try {
      await this.channel!.assertQueue(queueName);
      await this.channel!.assertExchange(exchangeName, exchangeType, exchangeOptions);
      await this.channel!.bindQueue(queueName, exchangeName, routingKey);

      this.channel!.consume(queueName, (msg) => {
        if (msg) {
          try {
            const content = JSON.parse(msg.content.toString());
            callback(content); // Process the message
            this.channel!.ack(msg); // Acknowledge the message
          } catch (error) {
            console.error('Failed to process message:', error);
          }
        }
      });
    } catch (error) {
      console.error('Failed to consume messages:', error);
      throw error;
    }
  }

  async deleteQueue(queueName: string): Promise<void> {
    await this.ensureChannel();

    try {
      await this.channel!.deleteQueue(queueName);
    } catch (error) {
      console.error('Failed to delete queue:', error);
      throw error;
    }
  }

  async deleteExchange(exchangeName: string): Promise<void> {
    await this.ensureChannel();

    try {
      await this.channel!.deleteExchange(exchangeName);
    } catch (error) {
      console.error('Failed to delete exchange:', error);
      throw error;
    }
  }

  async run(consumers: BusConsumer[]): Promise<void> {
    for (const consumer of consumers) {
      const consumerEvent = consumer.getEvent();
      const exchangeName = consumerEvent.getExchangeName();
      const exchangeType = consumerEvent.getExchangeType();
      const queueName = consumerEvent.getQueueName();
      const routingKey = consumerEvent.getRoutingKey();

      await this.createQueue(exchangeName, exchangeType, queueName, routingKey);

      const boundConsume = consumer.consume.bind(consumer);
      await this.consume(queueName, boundConsume, routingKey, exchangeName, exchangeType);
    }
  }

  private getExchangeParametersByRoutingKey(routingKey: string): ExchangeParameterType {
    if (routingKey.trim()) {
      return { exchangeName: this.DIRECT_EXCHANGE_NAME, exchangeType: this.DIRECT_EXCHANGE_TYPE as ExchangeType };
    }

    return { exchangeName: this.DEFAULT_EXCHANGE_NAME, exchangeType: this.DEFAULT_EXCHANGE_TYPE as ExchangeType };
  }
}
