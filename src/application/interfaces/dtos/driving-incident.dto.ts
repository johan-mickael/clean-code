export default class DrivingIncidentDTO {
  constructor(
    public id: string | null,
    public drivingHistoryId: string,
    public label: string,
    public comments: string,
  ) {}
}
