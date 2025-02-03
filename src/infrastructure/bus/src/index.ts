import * as amqp from 'amqplib';

import BusEmitter from '@triumph/application/ports/bus-emitter/bus-emitter.interface';

export default class RabbitMQEmitter implements BusEmitter {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private readonly rabbitUrl: string;

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
      console.log('Connected to RabbitMQ');

      this.channel = await this.connection.createChannel();
      console.log('Channel created');

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

  async emit(
    eventName: string,
    data: any,
    routingKey: string = '',
    exchangeName: string = 'events',
    exchangeType: string = 'fanout',
    exchangeOptions: amqp.Options.AssertExchange = { durable: false },
  ): Promise<void> {
    await this.ensureChannel();

    try {
      await this.channel!.assertExchange(exchangeName, exchangeType, exchangeOptions);
      this.channel!.publish(exchangeName, routingKey, Buffer.from(JSON.stringify({ event: eventName, data })));

      console.log(`Event emitted: ${eventName}, Exchange: ${exchangeName}, Routing Key: ${routingKey}`);
    } catch (error) {
      console.error('Failed to emit event:', error);
      throw error;
    }
  }

  async createQueue(
    queueName: string,
    exchangeName: string = 'events',
    routingKey: string = '',
    exchangeType: string = 'fanout',
    queueOptions: amqp.Options.AssertQueue = { durable: false },
  ): Promise<void> {
    await this.ensureChannel();

    try {
      await this.channel!.assertQueue(queueName, queueOptions);
      await this.channel!.assertExchange(exchangeName, exchangeType);
      await this.channel!.bindQueue(queueName, exchangeName, routingKey);

      console.log(`Queue "${queueName}" bound to Exchange "${exchangeName}" with Routing Key "${routingKey}"`);
    } catch (error) {
      console.error('Failed to create queue:', error);
      throw error;
    }
  }

  async consume(queueName: string, callback: (message: any) => void): Promise<void> {
    await this.ensureChannel();

    try {
      console.log(`Consuming messages from queue: ${queueName}`);
      await this.channel!.assertQueue(queueName);

      this.channel!.consume(queueName, (msg) => {
        if (msg) {
          try {
            const content = JSON.parse(msg.content.toString());
            callback(content);
            this.channel!.ack(msg);
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
      console.log(`Queue "${queueName}" deleted`);
    } catch (error) {
      console.error('Failed to delete queue:', error);
      throw error;
    }
  }

  async deleteExchange(exchangeName: string): Promise<void> {
    await this.ensureChannel();

    try {
      await this.channel!.deleteExchange(exchangeName);
      console.log(`Exchange "${exchangeName}" deleted`);
    } catch (error) {
      console.error('Failed to delete exchange:', error);
      throw error;
    }
  }
}
