import InvalidEntityError from '../errors/common/invalid-entity.error';

export class MaintenanceSchedule {
  private _id: string | undefined = undefined;

  constructor(
    private _label: string,
    private _bikeModelId: string,
    private _monthInterval?: number | null,
    private _mileageInterval?: number | null,
  ) {}

  get id(): string | undefined {
    return this._id;
  }

  setId(id: string): MaintenanceSchedule {
    this._id = id;
    return this;
  }

  get label(): string {
    return this._label;
  }

  set label(label: string) {
    this._label = label;
  }

  get bikeModelId(): string {
    return this._bikeModelId;
  }

  set bikeModelId(bikeModelId: string) {
    this._bikeModelId = bikeModelId;
  }

  get monthInterval(): number | null | undefined {
    return this._monthInterval;
  }

  set monthInterval(monthInterval: number) {
    if (monthInterval < 0) {
      throw new InvalidEntityError('Month interval must be a positive number');
    }

    this._monthInterval = monthInterval;
  }

  get mileageInterval(): number | null | undefined {
    return this._mileageInterval;
  }

  set mileageInterval(mileageInterval: number) {
    if (mileageInterval < 0) {
      throw new InvalidEntityError('Mileage interval must be a positive number');
    }

    this._mileageInterval = mileageInterval;
  }

  validate(): void {
    if (!this.label) {
      throw new InvalidEntityError('Maintenance schedule label is required');
    }

    if (!this.bikeModelId) {
      throw new InvalidEntityError('Bike model ID is required');
    }

    if (!this._monthInterval && !this._mileageInterval) {
      throw new InvalidEntityError('Either month interval or mileage interval is required');
    }
  }
}
