export default class MaintenanceDetailDTO {
  constructor(
    public id: string | null,
    public maintenanceId: string,
    public label: string,
    public maintenanceType: string,
    public sparePartId: string,
    public price: number,
    public comments: string,
  ) {}
}
