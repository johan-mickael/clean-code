import InvalidEntityError from '../errors/common/invalid-entity.error';

export class MaintenanceSchedule {
  constructor(
    private id?: string,
    private label?: string,
    private bikeModelId?: string,
    private monthInterval?: number,
    private mileageInterval?: number,
  ) {}

  getId(): string | null | undefined {
    return this.id;
  }

  setId(id: string): MaintenanceSchedule {
    this.id = id;
    return this;
  }

  getLabel(): string | null | undefined {
    return this.label;
  }

  setLabel(label: string): MaintenanceSchedule {
    this.label = label;
    return this;
  }

  getBikeModelId(): string | null | undefined {
    return this.bikeModelId;
  }

  setBikeModelId(bikeModelId: string): MaintenanceSchedule {
    this.bikeModelId = bikeModelId;
    return this;
  }

  getMonthInterval(): number | null | undefined {
    return this.monthInterval;
  }

  setMonthInterval(monthInterval: number): MaintenanceSchedule {
    if (monthInterval < 0) {
      throw new InvalidEntityError('Month interval must be a positive number');
    }

    this.monthInterval = monthInterval;
    return this;
  }

  getMileageInterval(): number | null | undefined {
    return this.mileageInterval;
  }

  setMileageInterval(mileageInterval: number): MaintenanceSchedule {
    if (mileageInterval < 0) {
      throw new InvalidEntityError('Mileage interval must be a positive number');
    }

    this.mileageInterval = mileageInterval;
    return this;
  }

  validate(): void {
    if (!this.label) {
      throw new InvalidEntityError('Maintenance schedule label is required');
    }

    if (!this.bikeModelId) {
      throw new InvalidEntityError('Bike model ID is required');
    }

    if (!this.monthInterval && !this.mileageInterval) {
      throw new InvalidEntityError('Either month interval or mileage interval is required');
    }
  }
}
