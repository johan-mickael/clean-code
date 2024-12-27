import { createContainer, asClass, asFunction } from 'awilix';
import OccupationController from '../controllers/occupation-controller';
import ExpressApplication from '../express-application';
import MongooseAdapter from '../../../../databases/mongoose/src';
import OccupationRepositoryFactory from './repositories/occupation-repository-factory';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DealerController from '../controllers/dealer-controller';
import DealerRepositoryFactory from './repositories/dealer-repository-factory';

const container = createContainer();

// Main application components
container.register({
  ExpressApplication: asClass(ExpressApplication).classic(),
  DatabaseAdapter: asClass(SequelizeAdapter).classic(),
});

// Dealer components
container.register({
  DealerController: asClass(DealerController).classic(),
  DealerRepositoryReader: asFunction(({ DatabaseAdapter }) => {
    return new DealerRepositoryFactory(DatabaseAdapter).create();
  }).singleton(),
});

// Occupation components
container.register({
  OccupationController: asClass(OccupationController).classic(),
  OccupationRepositoryReader: asFunction(({ DatabaseAdapter }) => {
    return new OccupationRepositoryFactory(DatabaseAdapter).create();
  }).singleton(),
});

export default container;
