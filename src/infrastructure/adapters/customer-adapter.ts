import { Customer } from '@triumph/domain/entity/customer';

import CustomerModel from '../databases/sequelize/src/models/customer.model';
import { toDomainDrivingLicense } from './driving-license-adapter';

export function toDomainCustomer(customerModel: CustomerModel): Customer {
  const drivingLicense = customerModel.drivingLicense ? toDomainDrivingLicense(customerModel.drivingLicense) : null;

  return new Customer(
    customerModel.id,
    drivingLicense,
    customerModel.occupation,
    customerModel.lastName,
    customerModel.firstName,
    customerModel.email,
    customerModel.address,
  );
}
