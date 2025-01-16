import Entity from './entity.interface';

export default class SparePart extends Entity {
  constructor(
    public id: string,
    public name: string,
    public price: number,
    public quantity: number,
  ) {
    super(id);
  }
}
