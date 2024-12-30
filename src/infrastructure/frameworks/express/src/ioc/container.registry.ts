import { asClass, asFunction, createContainer } from 'awilix';
import express from 'express';
import { register } from 'module';

import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike-model.repository-reader';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/readers/dealer.repository-reader';
import SequelizeBikeModelRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/bike-model.repository-writer';

import BikeModelController from '../controllers/bike-model.controller';
import DealerController from '../controllers/dealer.controller';
import ExpressApplication from '../express-application';
import BikeModelRoute from '../routes/bike-model.route';
import DealerRoute from '../routes/dealer.route';
import Routes from '../routes/index.route';
import registerDealerModule from './dealer.module';
import registerPartnerModule from './partner.module';

const container = createContainer();

// Register repositories
container.register({
  bikeModelRepositoryReader: asClass(SequelizeBikeModelRepositoryReader).classic(),
  bikeModelRepositoryWriter: asClass(SequelizeBikeModelRepositoryWriter).classic(),
});

// Register controllers and repositories
container.register({
  bikeModelController: asClass(BikeModelController).classic(),
});

// Register routes
container.register({
  bikeModelRoute: asClass(BikeModelRoute).classic(),
  routes: asClass(Routes).classic(),
});

// Register modules
registerPartnerModule(container);
registerDealerModule(container);

// Register express application
container.register({
  expressCore: asFunction(() => express()).singleton(),
  expressCoreRouter: asFunction(() => express.Router()),
  expressApplication: asClass(ExpressApplication).classic(),
});

export default container;
