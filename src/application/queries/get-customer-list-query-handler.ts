import { Customer } from '../../domain/entity/customer';
import CustomerRepositoryReader from '../ports/customer-repository-reader';
import GetCustomerListQuery from './get-customer-list-query';

export default class GetAllCustomersQueryHandler {
  constructor(private readonly customerRepositoryReader: CustomerRepositoryReader) {}

  execute(query: GetCustomerListQuery): Customer[] {
    return this.customerRepositoryReader.all();
  }
}
