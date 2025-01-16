export default class DriverLicenseDTO {
  constructor(
    public id: string | null,
    public driverId: string,
    public licenseNumber: string,
    public issueDate: Date,
    public expiryDate: Date,
    public licenseClass: string,
    public stateIssued: string,
    public isActive: boolean,
  ) {}
}
