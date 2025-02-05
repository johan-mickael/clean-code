import NotificationServiceInterface from '@triumph/application/ports/notifications/notification.interface';
import NotificationData from '@triumph/domain/models/notification-data';

import { maildevTransporter } from './config/maildev-transporter.config';

export default class MaildevNotificationService implements NotificationServiceInterface {
  public async sendNotification(notification: NotificationData): Promise<boolean> {
    maildevTransporter.sendMail({
      from: notification.from,
      to: notification.to,
      subject: notification.subject,
      text: notification.text,
    });

    return true;
  }
}
