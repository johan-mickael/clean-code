import { createContainer, asClass, asFunction } from 'awilix';
import OccupationController from '../controllers/occupation-controller';
import ExpressApplication from '../express-application';
import MongooseAdapter from '../../../../databases/mongoose/src';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DealerController from '../controllers/dealer-controller';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/dealer-repository-reader';
import SequelizeOccupationRepository from '@triumph/sequelize-adapter/src/repositories/occupation-repository-reader';

const container = createContainer();

// Main application components
container.register({
  ExpressApplication: asClass(ExpressApplication).classic(),
});

// Dealer components
container.register({
  DealerController: asClass(DealerController).classic(),
  DealerRepositoryReader: asClass(SequelizeDealerRepository).classic(),
});

// Occupation components
container.register({
  OccupationController: asClass(OccupationController).classic(),
  OccupationRepositoryReader: asClass(SequelizeOccupationRepository).classic(),
});

export default container;
