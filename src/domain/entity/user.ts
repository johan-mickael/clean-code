import Entity from './entity.interface';

export default class User extends Entity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public dealerId: string,
  ) {
    super(id);
  }
}
