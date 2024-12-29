import express from 'express';
import { createContainer, asClass, asFunction } from 'awilix';
import ExpressApplication from '../express-application';
import DealerController from '../controllers/dealer-controller';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/dealer-repository-reader';
import PartnerController from '../controllers/partner-controller';
import SequelizePartnerRepository from '@triumph/sequelize-adapter/src/repositories/partner-repository-reader';
import DealerRoute from '../routes/dealer-route';
import PartnerRoute from '../routes/partner-route';
import Routes from '../routes/index-route';
import SequelizeBikeModelRepositoryReader from '@triumph/sequelize-adapter/src/repositories/bike-model-repository-reader';
import SequelizeBikeModelRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/bike-model-repository-writer';
import BikeModelController from '../controllers/bike-model-controller';
import BikeModelRoute from '../routes/bike-model-route';

const container = createContainer();

// Register repositories
container.register({
  bikeModelRepositoryReader: asClass(SequelizeBikeModelRepositoryReader).classic(),
  bikeModelRepositoryWriter: asClass(SequelizeBikeModelRepositoryWriter).classic(),
  dealerRepositoryReader: asClass(SequelizeDealerRepository).classic(),
  partnerRepositoryReader: asClass(SequelizePartnerRepository).classic(),
});

// Register controllers and repositories
container.register({
  bikeModelController: asClass(BikeModelController).classic(),
  dealerController: asClass(DealerController).classic(),
  partnerController: asClass(PartnerController).classic(),
});

// Register routes
container.register({
  bikeModelRoute: asClass(BikeModelRoute).classic(),
  dealerRoute: asClass(DealerRoute).classic(),
  partnerRoute: asClass(PartnerRoute).classic(),
  routes: asClass(Routes).classic(),
});

// Register express application
container.register({
  expressCore: asFunction(() => express()),
  expressCoreRouter: asFunction(() => express.Router()),
  expressApplication: asClass(ExpressApplication).classic(),
});

export default container;
