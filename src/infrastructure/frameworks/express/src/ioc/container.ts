import { createContainer, asClass } from 'awilix';
import InMemoryCustomerRepository from '@triumph/in-memory-database-infrastructure/customer-repository-reader';
import CustomerController from '../controllers/customer-controller';

const container = createContainer();

container.register({
  customerRepositoryReader: asClass(InMemoryCustomerRepository).singleton(),
  customerController: asClass(CustomerController).classic(),
});

export default container;
