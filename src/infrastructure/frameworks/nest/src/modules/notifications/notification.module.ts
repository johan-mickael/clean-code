import { Module } from '@nestjs/common';
import NotificationServiceInterface from '@triumph/application/ports/notifications/notification.interface';
import MaildevNotificationService from '@triumph/notification/src/maildev/index';

@Module({
  imports: [NotificationModule],
  providers: [
    {
      provide: NotificationServiceInterface,
      useClass: MaildevNotificationService,
    },
  ],
  exports: [NotificationServiceInterface],
})
export class NotificationModule {}
