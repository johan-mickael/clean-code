import Entity from './entity.interface';

export default class SpareOrder extends Entity {
  constructor(
    public id: string,
    public spareId: string,
    public quantity: number,
    public price: number,
    public deliveryDelayDays: number,
  ) {
    super(id);
  }
}