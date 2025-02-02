export default class MaintenanceDTO {
  constructor(
    public id: string | null,
    public label: string,
    public bikeId: string,
    public lastMaintenanceDate: Date,
    public nextMaintenanceDate: Date,
    public maintenanceType: string,
  ) {}
}
