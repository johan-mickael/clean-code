import InvalidEntityError from '../../errors/common/invalid-entity.error';
import { MaintenanceStatus } from './status/maintenance-status.interface';

export default class Maintenance {
  private _id: string | undefined;

  constructor(
    public label: string,
    public bikeId: string,
    public status: MaintenanceStatus,
    public maintenanceDate?: Date,
  ) {}

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  validate(): void {
    if (!this.label) {
      throw new InvalidEntityError('Maintenance label is required');
    }

    if (!this.bikeId) {
      throw new InvalidEntityError('Bike ID is required');
    }

    if (!this.status) {
      throw new InvalidEntityError('Status is required');
    }
  }
}
