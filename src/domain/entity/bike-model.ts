import Entity from './entity.interface';

export class BikeModel extends Entity {
  constructor(
    public id: string,
    public name: string,
  ) {
    super(id);
  }
}
