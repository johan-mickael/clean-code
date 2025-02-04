import { Module } from '@nestjs/common';
import { CONSUMERS } from '@triumph/bus/src/consumers/consumers.registry';

import { MessageService } from '../../services/message-broker.service';
import { BusEmitterProvider } from './bus.provider';

@Module({
  providers: [
    MessageService,
    BusEmitterProvider,
    {
      provide: 'BUS_CONSUMERS',
      useValue: CONSUMERS,
    },
  ],
  exports: [BusEmitterProvider, 'BUS_CONSUMERS'],
})
export class BusModule {}
