import { Module } from '@nestjs/common';
import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer.repository-reader';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner.repository-reader';
import PartnerRepositoryWriter from '@triumph/application/ports/repositories/writers/partner.repository-writer';
import SequelizeDealerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/dealer.repository-reader';
import SequelizePartnerRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/partner.repository-reader';
import SequelizePartnerRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/partner.repository-writer';

import PartnerController from '../../controllers/partner.controller';
import {
  CreatePartnerUseCaseProvider,
  DeletePartnerUseCaseProvider,
  GetPartnerByIdentifierUseCaseProvider,
  ListPartnersUseCaseProvider,
  UpdatePartnerUseCaseProvider,
} from './partner.provider';

@Module({
  imports: [],
  controllers: [PartnerController],
  providers: [
    {
      provide: PartnerRepositoryReader,
      useClass: SequelizePartnerRepositoryReader,
    },
    {
      provide: PartnerRepositoryWriter,
      useClass: SequelizePartnerRepositoryWriter,
    },
    {
      provide: DealerRepositoryReader,
      useClass: SequelizeDealerRepositoryReader,
    },
    ListPartnersUseCaseProvider,
    GetPartnerByIdentifierUseCaseProvider,
    CreatePartnerUseCaseProvider,
    UpdatePartnerUseCaseProvider,
    DeletePartnerUseCaseProvider,
  ],
  exports: [],
})
export class PartnerModule {}
