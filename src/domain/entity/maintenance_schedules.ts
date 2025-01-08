import InvalidMileageIntervalMaintenanceScheduleError from '../errors/maintenance_schedules/invalid-mileage-interval-maintenance-schedule.error';
import InvalidMonthIntervalMaintenanceScheduleError from '../errors/maintenance_schedules/invalid-month-interval-maintenance-schedule.error';
import Entity from './entity.interface';

export class MaintenanceSchedule extends Entity {
  constructor(
    public id: string,
    public label: string,
    public bikeModelId: string,
    public monthInterval?: number | null,
    public mileageInterval?: number | null,
  ) {
    super(id);
  }

  getMonthInterval(): number | null {
    return this.monthInterval || null;
  }

  getMileageInterval(): number | null {
    return this.mileageInterval || null;
  }

  setMonthInterval(monthInterval: number): void {
    if (monthInterval < 0) {
      throw new InvalidMonthIntervalMaintenanceScheduleError();
    }

    this.monthInterval = monthInterval;
  }

  setMileageInterval(mileageInterval: number): void {
    if (mileageInterval < 0) {
      throw new InvalidMileageIntervalMaintenanceScheduleError();
    }

    this.mileageInterval = mileageInterval;
  }
}
