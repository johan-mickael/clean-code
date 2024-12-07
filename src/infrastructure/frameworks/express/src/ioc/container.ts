import { createContainer, asClass } from 'awilix';
import InMemoryCustomerRepository from '@triumph/in-memory-database-infrastructure/customer-repository-reader';
import CustomerController from '../controllers/customer-controller';
import InMemoryOccupationRepository from '@triumph/in-memory-database-infrastructure/occupation-repository-reader';
import OccupationController from '../controllers/occupation-controller';

const container = createContainer();

container.register({
  CustomerRepositoryReader: asClass(InMemoryCustomerRepository).singleton(),
  CustomerController: asClass(CustomerController).classic(),

  OccupationRepositoryReader: asClass(InMemoryOccupationRepository).singleton(),
  OccupationController: asClass(OccupationController).classic(),
});

export default container;
