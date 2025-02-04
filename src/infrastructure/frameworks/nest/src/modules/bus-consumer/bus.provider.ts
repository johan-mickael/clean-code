import BusEmitter from '@triumph/application/ports/message-broker/bus-emitter.interface';

import RabbitMQEmitter from '../../../../../bus/src';

export const BusEmitterProvider = {
  provide: BusEmitter,
  useFactory: async () => {
    try {
      const busEmitter = new RabbitMQEmitter();
      await busEmitter.connect();
      return busEmitter;
    } catch (error) {
      console.error('Error connecting to the bus', error);
      process.exit(1);
    }
  },
};
