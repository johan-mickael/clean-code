export default class SpareOrderDTO {
    constructor(
      public id: string | null,
      public spareId: string,
      public quantity: number,
      public price: number,
      public deliveryDelayDays: number,
    ) {}
  }
  