import { Request, Response } from 'express';
import GetCustomerListQueryHandler from '../../../../../application/queries/get-customer-list-query-handler';
import GetCustomerListQuery from '../../../../../application/queries/get-customer-list-query';

export default class CustomerController {
  constructor(
    private readonly getCustomerListQueryHandler: GetCustomerListQueryHandler,
  ) {}

  all(req: Request, res: Response): Response {
    const getCustomerListQuery = new GetCustomerListQuery();
    const customers =
      this.getCustomerListQueryHandler.execute(getCustomerListQuery);

    return res.status(200).json(customers);
  }
}
