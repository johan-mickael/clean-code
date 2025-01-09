export class MaintenanceScheduleDTO {
  constructor(
    public readonly id?: string,
    public readonly label?: string,
    public readonly bikeModelId?: string,
    public readonly monthInterval?: number,
    public readonly mileageInterval?: number,
  ) {}
}
