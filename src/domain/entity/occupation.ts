import Entity from './entity.interface';

export class Occupation extends Entity {
  constructor(
    public id: string,
    public name: string,
  ) {
    super(id);
  }
}
