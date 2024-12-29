import { Module } from '@nestjs/common';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/readers/partner.repository-reader';
import SequelizePartnerRepository from '@triumph/sequelize-adapter/src/repositories/readers/partner.repository-reader';

import PartnerController from '../controllers/partner.controller';

@Module({
  imports: [],
  controllers: [PartnerController],
  providers: [
    {
      provide: PartnerRepositoryReader,
      useClass: SequelizePartnerRepository,
    },
  ],
  exports: [],
})
export class PartnerModule {}
