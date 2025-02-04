import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import BusConsumer from '@triumph/application/ports/message-broker/bus-consumer.interface';
import BusEmitter from '@triumph/application/ports/message-broker/bus-emitter.interface';

@Injectable()
export class MessageService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly busEmitter: BusEmitter,
    @Inject('BUS_CONSUMERS') private readonly consumers: BusConsumer[],
  ) {}

  async onModuleInit(): Promise<void> {
    await this.busEmitter.run(this.consumers);
  }

  async onModuleDestroy(): Promise<void> {
    await this.busEmitter.disconnect();
  }
}
