import Entity from './entity.interface';

export default class DrivingHistory extends Entity {
  constructor(
    public id: string,
    public driverId: string,
    public bikeId: string,
    public label: string,
  ) {
    super(id);
  }
}
