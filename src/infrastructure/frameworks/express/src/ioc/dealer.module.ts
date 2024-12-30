import { AwilixContainer, asClass, asFunction } from 'awilix';

import GetDealerByIdentifierQueryHandler from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.query-handler';
import ListDealersQueryHandler from '@triumph/application/queries/partners/list-partners/list-partners.query-handler';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/readers/dealer.repository-reader';

import DealerController from '../controllers/dealer.controller';
import DealerRoute from '../routes/dealer.route';

const registerDealerModule = (container: AwilixContainer) => {
  // Register repositories
  container.register({
    dealerRepositoryReader: asClass(SequelizeDealerRepository).classic(),
  });

  // Register use cases
  container.register({
    listDealersUseCase: asFunction(() => {
      return new ListDealersQueryHandler(container.resolve('dealerRepositoryReader'));
    }).singleton(),
    getDealerByIdentifierUseCase: asFunction(() => {
      return new GetDealerByIdentifierQueryHandler(container.resolve('dealerRepositoryReader'));
    }).singleton(),
  });

  // Register controllers and repositories
  container.register({
    dealerController: asClass(DealerController).classic(),
  });

  // Register routes
  container.register({
    dealerRoute: asClass(DealerRoute).classic(),
  });
};

export default registerDealerModule;
