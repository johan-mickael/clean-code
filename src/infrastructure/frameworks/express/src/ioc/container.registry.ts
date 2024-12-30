import { asClass, asFunction, createContainer } from 'awilix';
import express from 'express';

import ExpressApplication from '../express-application';
import Routes from '../routes/index.route';
import registerBikeModelModule from './bike-model.module';
import registerDealerModule from './dealer.module';
import registerPartnerModule from './partner.module';

const container = createContainer();

// Register modules
registerBikeModelModule(container);
registerPartnerModule(container);
registerDealerModule(container);

// Register express application
container.register({
  routes: asClass(Routes).classic(),
  expressCore: asFunction(() => express()).singleton(),
  expressCoreRouter: asFunction(() => express.Router()),
  expressApplication: asClass(ExpressApplication).classic(),
});

export default container;
