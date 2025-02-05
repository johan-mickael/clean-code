import { Module } from '@nestjs/common';

import { MessageService } from '../../services/message-broker.service';
import { BikeModule } from '../bikes/bike.module';
import { NotificationModule } from '../notifications/notification.module';
import { PartnerModule } from '../partners/partner.module';
import {
  BusConsumerProvider,
  ScheduledMaintenanceForBikeConsumerProvider,
  SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCaseProvider,
} from './bus-consumer.provider';
import { BusEmitterProvider } from './bus.provider';

@Module({
  imports: [BikeModule, PartnerModule, NotificationModule],
  providers: [
    MessageService,
    BusEmitterProvider,
    BusConsumerProvider,
    SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCaseProvider,
    ScheduledMaintenanceForBikeConsumerProvider,
  ],
  exports: [BusEmitterProvider, 'BUS_CONSUMERS'],
})
export class BusModule {}
