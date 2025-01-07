import { CustomerEvent } from '@triumph/domain/entity/customer-event';

import CustomerEventRepositoryReader from '../../../ports/repositories/reader/customer-event-repository-reader';
import SearchCustomerEventQuery from './search-customer-event-query';

export default class SearchCustomerQueryHandler {
  constructor(private readonly customerEventRepositoryReader: CustomerEventRepositoryReader) {}

  async execute(query: SearchCustomerEventQuery): Promise<CustomerEvent[]> {
    return this.customerEventRepositoryReader.search(query.keyword);
  }
}
