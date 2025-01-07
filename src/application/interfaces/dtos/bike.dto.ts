export default class BikeDTO {
  constructor(
    public id: string | null,
    public bikeModelId: string,
    public partnerId: string,
    public mileage: number,
    public status: number,
    public circulationDate: Date,
  ) {}
}
