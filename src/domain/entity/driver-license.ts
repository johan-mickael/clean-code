import Entity from './entity.interface';

export default class DriverLicense extends Entity {
  constructor(
    public id: string,
    public driverId: string,
    public licenseNumber: string,
    public issueDate: Date,
    public expiryDate: Date,
    public licenseClass: string,
    public stateIssued: string,
    public isActive: boolean,
  ) {
    super(id);
  }
}
