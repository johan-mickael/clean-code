import Entity from './entity.interface';

export default class Driver extends Entity {
  constructor(
    public id: string,
    public firstname: string,
    public lastname: string,
    public profilePicture: string,
  ) {
    super(id);
  }
}