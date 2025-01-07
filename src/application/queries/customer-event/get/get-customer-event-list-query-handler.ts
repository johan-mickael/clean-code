import { CustomerEvent } from '@triumph/domain/entity/customer-event';

import CustomerEventRepositoryReader from '../../../ports/repositories/reader/customer-event-repository-reader';
import GetCustomerEventListQuery from './get-customer-event-list-query';

export default class GetCustomerEventListQueryHandler {
  constructor(private readonly customerEventRepositoryReader: CustomerEventRepositoryReader) {}

  async execute(query: GetCustomerEventListQuery): Promise<CustomerEvent[]> {
    return await this.customerEventRepositoryReader.list();
  }
}
