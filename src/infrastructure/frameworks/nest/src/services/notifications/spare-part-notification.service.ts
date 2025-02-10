import { Injectable } from '@nestjs/common';
import NotificationServiceInterface from '@triumph/application/ports/notifications/notification.interface';
import NotificationData from '@triumph/domain/models/notification-data';

@Injectable()
export class SparePartNotificationService {
  constructor(
    private readonly notificationService: NotificationServiceInterface
  ) {}

  async notifyLowStock(sparePartName: string, quantity: number): Promise<void> {
    const notificationData = new NotificationData(
      'admin@triumph.com', 
      'Alerte Stock Faible',
      `Le stock de la pièce ${sparePartName} est bas (${quantity} restants)`
    );

    await this.notificationService.sendNotification(notificationData);
  }
}