export class MaintenanceScheduleDTO {
  constructor(
    public readonly label: string,
    public readonly bikeModelId: string,
    public readonly monthInterval?: number | null,
    public readonly mileageInterval?: number | null,
    public readonly id?: string,
  ) {}
}
