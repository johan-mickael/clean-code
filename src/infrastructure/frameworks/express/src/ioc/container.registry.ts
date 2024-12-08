import { createContainer, asClass } from 'awilix';
import InMemoryCustomerRepository from '@triumph/in-memory-database-infrastructure/customer-repository-reader';
import CustomerController from '../controllers/customer-controller';
import OccupationController from '../controllers/occupation-controller';
import SequelizeOccupationRepository from '@triumph/sequelize-adapter/src/repositories/occupation-repository-reader';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import ExpressApplication from '../express-application';

const container = createContainer();

container.register({
  ExpressApplication: asClass(ExpressApplication).classic(),
  DatabaseAdapter: asClass(SequelizeAdapter).classic(),

  CustomerRepositoryReader: asClass(InMemoryCustomerRepository).singleton(),
  CustomerController: asClass(CustomerController).classic(),

  OccupationRepositoryReader: asClass(SequelizeOccupationRepository).singleton(),
  OccupationController: asClass(OccupationController).classic(),
});

export default container;
