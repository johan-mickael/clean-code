import { Controller, Get } from '@nestjs/common';

import GetCustomerListQueryHandler from '../../../../../application/queries/get-customer-list-query-handler';
import GetCustomerListQuery from '../../../../../application/queries/get-customer-list-query';
import { Customer } from '../../../../../domain/entity/customer';
import CustomerRepositoryReader from '../../../../../application/ports/repositories/customer-repository-reader';

@Controller('customers')
export default class CustomerController {
  constructor(private readonly customerRepositoryReader: CustomerRepositoryReader) {}

  @Get()
  all(): Customer[] {
    const getCustomerListUsecase = new GetCustomerListQueryHandler(this.customerRepositoryReader);
    const customers = getCustomerListUsecase.execute(new GetCustomerListQuery());

    return customers;
  }
}
