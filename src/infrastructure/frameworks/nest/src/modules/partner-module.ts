import { Module } from '@nestjs/common';
import PartnerController from '../controllers/partner-controller';
import SequelizePartnerRepository from '@triumph/sequelize-adapter/src/repositories/partner-repository-reader';
import PartnerRepositoryReader from '@triumph/application/ports/repositories/partner-repository-reader';

@Module({
  imports: [],
  controllers: [PartnerController],
  providers: [
    {
      provide: PartnerRepositoryReader,
      useClass: SequelizePartnerRepository,
    }
  ],
  exports: [],
})
export class PartnerModule { }
