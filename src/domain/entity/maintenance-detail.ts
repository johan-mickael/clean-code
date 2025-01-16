import Entity from './entity.interface';

export default class MaintenanceDetail extends Entity {
  constructor(
    public id: string,
    public label: string,
    public maintenanceId: string,
    public sparePartId: string,
    public maintenanceType: string,
    public price: number,
    public comments: string,
  ) {
    super(id);
  }
}
