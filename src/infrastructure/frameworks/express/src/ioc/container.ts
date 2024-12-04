import { createContainer, asClass } from 'awilix';
import GetCustomerListQueryHandler from '../../../../../application/queries/get-customer-list-query-handler';
import InMemoryCustomerRepository from '../../../../adapters/in-memory-database/customer-repository-reader';
import CustomerController from '../controllers/customer-controller';

const container = createContainer();

container.register({
  customerRepositoryReader: asClass(InMemoryCustomerRepository).singleton(),
  getCustomerListQueryHandler: asClass(GetCustomerListQueryHandler).classic(),
  customerController: asClass(CustomerController).classic(),
});

export default container;
