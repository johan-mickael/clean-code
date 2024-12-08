import { createContainer, asClass } from 'awilix';
import InMemoryCustomerRepository from '@triumph/in-memory-database-infrastructure/customer-repository-reader';
import CustomerController from '../controllers/customer-controller';
import OccupationController from '../controllers/occupation-controller';
import SequelizeOccupationRepository from '@triumph/sequelize-adapter/src/repositories/occupation-repository-reader';

const container = createContainer();

container.register({
  CustomerRepositoryReader: asClass(InMemoryCustomerRepository).singleton(),
  CustomerController: asClass(CustomerController).classic(),

  OccupationRepositoryReader: asClass(SequelizeOccupationRepository).singleton(),
  OccupationController: asClass(OccupationController).classic(),
});

export default container;
