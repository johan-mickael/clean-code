export default class InvalidMonthIntervalMaintenanceScheduleError extends Error {
  constructor() {
    super('Month interval must be a positive number');
    Object.setPrototypeOf(this, InvalidMonthIntervalMaintenanceScheduleError.prototype);
  }
}
