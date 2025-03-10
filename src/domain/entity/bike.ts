import Entity from './entity.interface';

export default class Bike extends Entity {
  constructor(
    public id: string,
    public bikeModelId: string,
    public partnerId: string,
    public mileage: number,
    public status: number,
    public circulationDate: Date,
  ) {
    super(id);
  }
}
