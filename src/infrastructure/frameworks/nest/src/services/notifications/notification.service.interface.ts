export default abstract class NotificationService {
  public abstract sendNotification(): Promise<void>;
}
