export default class InvalidMileageIntervalMaintenanceScheduleError extends Error {
  constructor() {
    super('Mileage interval must be a positive number');
    Object.setPrototypeOf(this, InvalidMileageIntervalMaintenanceScheduleError.prototype);
  }
}
