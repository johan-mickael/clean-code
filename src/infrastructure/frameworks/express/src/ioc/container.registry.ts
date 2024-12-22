import { createContainer, asClass } from 'awilix';
import OccupationController from '../controllers/occupation-controller';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import ExpressApplication from '../express-application';
import SequelizeOccupationRepository from '@triumph/sequelize-adapter/src/repositories/occupation-repository-reader';

const container = createContainer();

container.register({
  ExpressApplication: asClass(ExpressApplication).classic(),
  DatabaseAdapter: asClass(SequelizeAdapter).classic(),

  OccupationRepositoryReader: asClass(SequelizeOccupationRepository).singleton(),
  OccupationController: asClass(OccupationController).classic(),
});

export default container;
