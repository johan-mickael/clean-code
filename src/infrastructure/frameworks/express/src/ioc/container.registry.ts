import express from 'express';
import { createContainer, asClass, asFunction } from 'awilix';
import ExpressApplication from '../express-application';
import DealerController from '../controllers/dealer-controller';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/dealer-repository-reader';
import PartnerController from '../controllers/partner-controller';
import SequelizePartnerRepository from '@triumph/sequelize-adapter/src/repositories/partner-repository-reader';
import DealerRoute from '../routes/dealer-route';
import PartnerRoute from '../routes/partner-route';
import IndexRoute from '../routes/index-route';

const container = createContainer();

// Register repositories
container.register({
  dealerRepositoryReader: asClass(SequelizeDealerRepository).classic(),
  partnerRepositoryReader: asClass(SequelizePartnerRepository).classic(),
});

// Register controllers and repositories
container.register({
  dealerController: asClass(DealerController).classic(),
  partnerController: asClass(PartnerController).classic(),
});

// Register routes
container.register({
  dealerRoute: asClass(DealerRoute).classic(),
  partnerRoute: asClass(PartnerRoute).classic(),
  indexRoute: asClass(IndexRoute).classic(),
});

// Register express application
container.register({
  expressCore: asFunction(() => express()).singleton(),
  expressCoreRouter: asFunction(() => express.Router()).classic(),
  expressApplication: asClass(ExpressApplication).classic(),
});

export default container;
