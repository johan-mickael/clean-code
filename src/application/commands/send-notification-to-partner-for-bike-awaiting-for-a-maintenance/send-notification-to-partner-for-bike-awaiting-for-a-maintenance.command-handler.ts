import { BikeNotFoundError } from '@triumph/domain/errors/bikes/bike-not-found.error';
import { PartnerNotFoundError } from '@triumph/domain/errors/partners/partner-not-found.error';
import NotificationData from '@triumph/domain/models/notification-data';

import NotificationServiceInterface from '../../ports/notifications/notification.interface';
import BikeRepositoryReader from '../../ports/repositories/readers/bike-repository-reader';
import PartnerRepositoryReader from '../../ports/repositories/readers/partner.repository-reader';
import SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand from './send-notification-to-partner-for-bike-awaiting-for-a-maintenance.command';
import SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase from './send-notification-to-partner-for-bike-awaiting-for-a-maintenance.usecase';

export default class SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommandHandler
  implements SendNotificationToPartnerForBikeAwaitingForAMaintenanceUseCase
{
  private MAIL_SUBJECT = 'Moto en attente de maintenance';
  constructor(
    private readonly bikeRepositoryReader: BikeRepositoryReader,
    private readonly partnerRepositoryReader: PartnerRepositoryReader,
    private readonly notificationServiceInterface: NotificationServiceInterface,
  ) {}

  async execute(
    sendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand: SendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand,
  ): Promise<boolean> {
    const { bikeId, label: maintenanceLabel } = sendNotificationToPartnerForBikeAwaitingForAMaintenanceCommand.data;

    const bike = await this.bikeRepositoryReader.getById(bikeId);
    if (!bike) {
      throw new BikeNotFoundError();
    }

    const partner = await this.partnerRepositoryReader.getById(bike.partnerId);
    if (!partner) {
      throw new PartnerNotFoundError();
    }

    const message = `La moto: [${bike.id}] est en attente de maintenance: ${maintenanceLabel}`;

    const notificationData = new NotificationData(partner.email, this.MAIL_SUBJECT, message);

    await this.notificationServiceInterface.sendNotification(notificationData);

    return true;
  }
}
