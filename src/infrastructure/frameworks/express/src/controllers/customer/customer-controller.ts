import { Request, Response } from 'express';

import CustomerRepositoryReader from '@triumph/application/ports/repositories/reader/customer-repository-reader';
import SearchCustomerQuery from '@triumph/application/queries/customer/filter/search-customer-query';
import SearchCustomerQueryHandler from '@triumph/application/queries/customer/filter/search-customer-query-handler';
import GetCustomerListQuery from '@triumph/application/queries/customer/get/get-customer-list-query';
import GetCustomerListQueryHandler from '@triumph/application/queries/customer/get/get-customer-list-query-handler';
import GetCustomerQuery from '@triumph/application/queries/customer/get/get-customer-query';
import GetCustomerQueryHandler from '@triumph/application/queries/customer/get/get-customer-query-handler';

export default class CustomerController {
  constructor(private readonly CustomerRepositoryReader: CustomerRepositoryReader) {}

  async list(req: Request, res: Response): Promise<Response> {
    const listCustomerUsecase = new GetCustomerListQueryHandler(this.CustomerRepositoryReader);
    const customers = await listCustomerUsecase.execute(new GetCustomerListQuery());
    return res.status(200).json(customers);
  }

  async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const numericId = parseInt(id, 10);
    if (isNaN(numericId)) {
      return res.status(400).json({ message: 'ID invalide' });
    }

    const getCustomerUsecase = new GetCustomerQueryHandler(this.CustomerRepositoryReader);
    const customer = await getCustomerUsecase.execute(new GetCustomerQuery(numericId));

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.status(200).json(customer);
  }

  async search(req: Request, res: Response): Promise<Response> {
    const { keyword } = req.params;

    const searchCustomerUsecase = new SearchCustomerQueryHandler(this.CustomerRepositoryReader);
    const customers = await searchCustomerUsecase.execute(new SearchCustomerQuery(keyword));

    return res.status(200).json(customers);
  }
}
