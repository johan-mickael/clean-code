export default class NotificationData {
  public readonly from = 'triumph+admin@email.com';

  constructor(
    public to: string,
    public subject: string,
    public text: string,
  ) {}
}
