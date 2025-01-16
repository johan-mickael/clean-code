import Entity from './entity.interface';

export default class Maintenance extends Entity {
  constructor(
    public id: string,
    public label: string,
    public bikeId: string,
    public lastMaintenanceDate: Date,
    public nextMaintenanceDate: Date,
    public maintenanceType: string,
  ) {
    super(id);
  }
}
