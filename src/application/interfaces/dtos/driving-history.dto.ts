export default class DrivingHistoryDTO {
  constructor(
    public id: string | null,
    public driverId: string,
    public bikeId: string,
    public label: string,
  ) {}
}
