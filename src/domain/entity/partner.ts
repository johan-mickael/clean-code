import Entity from './entity.interface';

export class Partner extends Entity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public dealerId: string,
  ) {
    super(id);
  }
}