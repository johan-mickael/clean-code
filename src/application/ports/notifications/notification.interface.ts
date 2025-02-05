import NotificationData from '@triumph/domain/models/notification-data';

export default abstract class NotificationServiceInterface {
  abstract sendNotification(notificationData: NotificationData): Promise<boolean>;
}
