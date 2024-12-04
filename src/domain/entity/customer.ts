import { DrivingLicense } from './driving-license';
import { Occupation } from './occupation';

export class Customer {
  constructor(
    public id: number,
    public permis: DrivingLicense,
    public profession: Occupation,
    public lastName: string,
    public firstName: string,
    public email: string,
    public address: string,
  ) {}
}
