import SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandHandler from '@triumph/application/commands/send-notification-to-partner-for-bike-awaiting-for-a-maintenance/send-notification-to-partner-for-bike-awaiting-for-a-maintenance.command-handler';
import SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase from '@triumph/application/commands/send-notification-to-partner-for-bike-awaiting-for-a-maintenance/send-notification-to-partner-for-bike-awaiting-for-a-maintenance.usecase';
import NotificationServiceInterface from '@triumph/application/ports/notifications/notification.interface';
import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner.repository-reader';

import ScheduledMaintenanceForBikeConsumer from '../../bus-consumers/scheduled-maintenance-for-bike.consumer';

export const SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCaseProvider = {
  provide: SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase,
  useFactory: (
    bikeRepositoryReader: BikeRepositoryReader,
    partnerRepositoryReader: PartnerRepositoryReader,
    notificationService: NotificationServiceInterface,
  ) => {
    return new SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandHandler(
      bikeRepositoryReader,
      partnerRepositoryReader,
      notificationService,
    );
  },
  inject: [BikeRepositoryReader, PartnerRepositoryReader, NotificationServiceInterface],
};

export const ScheduledMaintenanceForBikeConsumerProvider = {
  provide: ScheduledMaintenanceForBikeConsumer,
  useFactory: (useCase: SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase) => {
    return new ScheduledMaintenanceForBikeConsumer(useCase);
  },
  inject: [SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase],
};

export const BusConsumerProvider = {
  provide: 'BUS_CONSUMERS',
  useFactory: (generateMaintenanceForBikeConsumer: ScheduledMaintenanceForBikeConsumer) => {
    return [generateMaintenanceForBikeConsumer];
  },
  inject: [ScheduledMaintenanceForBikeConsumer],
};
