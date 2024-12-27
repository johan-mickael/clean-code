import Entity from './entity.interface';

export class Dealer extends Entity {
  constructor(
    public id: string,
    public name: string,
    public address: string,
  ) {
    super(id);
  }
}
