import { AwilixContainer, asClass, asFunction } from 'awilix';

import CreatePartnerCommandHandler from '@triumph/application/commands/partners/create-partner/create-partner.command-handler';
import DeletePartnerCommandHandler from '@triumph/application/commands/partners/delete-partner/delete-partner.command-handler';
import UpdatePartnerCommandHandler from '@triumph/application/commands/partners/update-partner/update-partner.command-handler';
import GetDealerByIdentifierQueryHandler from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.query-handler';
import ListDealersQueryHandler from '@triumph/application/queries/partners/list-partners/list-partners.query-handler';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/readers/dealer.repository-reader';
import SequelizePartnerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/partner.repository-reader';
import SequelizePartnerRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/partner.repository-writer';

import DealerController from '../controllers/dealer.controller';
import PartnerController from '../controllers/partner.controller';
import DealerRoute from '../routes/dealer.route';
import PartnerRoute from '../routes/partner.route';

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
