import { AwilixContainer, asClass, asFunction } from 'awilix';

import CreatePartnerCommandHandler from '@triumph/application/commands/partners/create-partner/create-partner.command-handler';
import DeletePartnerCommandHandler from '@triumph/application/commands/partners/delete-partner/delete-partner.command-handler';
import UpdatePartnerCommandHandler from '@triumph/application/commands/partners/update-partner/update-partner.command-handler';
import GetPartnerByIdentifierQueryHandler from '@triumph/application/queries/partners/get-partner-by-identifier/get-partner-by-identifier.query-handler';
import ListPartnersQueryHandler from '@triumph/application/queries/partners/list-partners/list-partners.query-handler';
import SequelizePartnerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/partner.repository-reader';
import SequelizePartnerRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/partner.repository-writer';

import PartnerController from '../controllers/partner.controller';
import PartnerRoute from '../routes/partner.route';

const registerPartnerModule = (container: AwilixContainer) => {
  // Register repositories
  container.register({
    partnerRepositoryReader: asClass(SequelizePartnerRepositoryReader).classic(),
    partnerRepositoryWriter: asClass(SequelizePartnerRepositoryWriter).classic(),
  });

  // Register use cases
  container.register({
    listPartnersUseCase: asFunction(() => {
      return new ListPartnersQueryHandler(container.resolve('partnerRepositoryReader'));
    }).singleton(),
    getPartnerByIdentifierUseCase: asFunction(() => {
      return new GetPartnerByIdentifierQueryHandler(container.resolve('partnerRepositoryReader'));
    }).singleton(),
    createPartnerUseCase: asFunction(() => {
      return new CreatePartnerCommandHandler(
        container.resolve('partnerRepositoryWriter'),
        container.resolve('dealerRepositoryReader'),
      );
    }).singleton(),
    updatePartnerUseCase: asFunction(() => {
      return new UpdatePartnerCommandHandler(
        container.resolve('partnerRepositoryWriter'),
        container.resolve('dealerRepositoryReader'),
      );
    }).singleton(),
    deletePartnerUseCase: asFunction(() => {
      return new DeletePartnerCommandHandler(container.resolve('partnerRepositoryWriter'));
    }).singleton(),
  });

  container.register({
    partnerController: asClass(PartnerController).classic(),
  });

  // Register routes
  container.register({
    partnerRoute: asClass(PartnerRoute).classic(),
  });
};

export default registerPartnerModule;
