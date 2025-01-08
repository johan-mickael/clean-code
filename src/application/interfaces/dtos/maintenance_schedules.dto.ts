export class MaintenanceScheduleDTO {
  constructor(
    public readonly id: string | null,
    public readonly label: string,
    public readonly bikeModelId: string,
    public readonly monthInterval?: number | null,
    public readonly mileageInterval?: number | null,
  ) {}
}
