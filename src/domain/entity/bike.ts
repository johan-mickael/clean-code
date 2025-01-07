import { BikeModel } from './bike-model';
import Entity from './entity.interface';
import { Partner } from './partner';

export class Bike extends Entity {
  constructor(
    public id: string,
    public bikeModel: BikeModel,
    public partner: Partner,
    public mileage: number,
    public status: number,
    public circulationDate: Date,
  ) {
    super(id);
  }
}
