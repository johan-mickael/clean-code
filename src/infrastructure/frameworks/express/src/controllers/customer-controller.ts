import { Request, Response } from 'express';
import GetCustomerListQueryHandler from '../../../../../application/queries/get-customer-list-query-handler';
import GetCustomerListQuery from '../../../../../application/queries/get-customer-list-query';
import CustomerRepositoryReader from '../../../../../application/ports/repositories/customer-repository-reader';

export default class CustomerController {
  constructor(private readonly customerRepositoryReader: CustomerRepositoryReader) {}

  all(req: Request, res: Response): Response {
    const listCustomerUsecase = new GetCustomerListQueryHandler(this.customerRepositoryReader);
    const customers = listCustomerUsecase.execute(new GetCustomerListQuery());

    return res.status(200).json(customers);
  }
}
