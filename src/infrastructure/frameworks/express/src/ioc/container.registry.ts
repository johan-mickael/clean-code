import { createContainer, asClass, asFunction } from 'awilix';
import ExpressApplication from '../express-application';
import DealerController from '../controllers/dealer-controller';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/dealer-repository-reader';

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

export default container;
