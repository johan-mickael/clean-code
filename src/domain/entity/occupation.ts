import Entity from "./entity.interface";

export class Occupation implements Entity {
  constructor(
    public id: string | number,
    public name: string,
  ) {}
}
