import Entity from './entity.interface';

export default class DrivingIncident extends Entity {
  constructor(
    public id: string,
    public drivingHistoryId: string,
    public label: string,
    public comments: string,
  ) {
    super(id);
  }
}
