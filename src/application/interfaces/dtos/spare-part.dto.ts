export default class SparePartDTO {
  constructor(
    public id: string | null,
    public name: string,
    public price: number,
    public quantity: number,
  ) {}
}
