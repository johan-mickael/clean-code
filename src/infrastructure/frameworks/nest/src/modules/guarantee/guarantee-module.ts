import { Module } from '@nestjs/common';
import CreateGuaranteeCommandHandler from '@triumph/application/queries/guarantee/add/create-guarantee-handler';
import SearchGuaranteeQueryHandler from '@triumph/application/queries/guarantee/filter/search-guarantee-query-handler';
import GetGuaranteeListQueryHandler from '@triumph/application/queries/guarantee/get/get-guarantee-list-query-handler';
import GetGuaranteeQueryHandler from '@triumph/application/queries/guarantee/get/get-guarantee-query-handler';
import SequelizeGuaranteeRepositoryReader from '@triumph/sequelize-adapter/src/repositories/guarantee/guarantee-repository-reader';
import SequelizeGuaranteeRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/guarantee/guarantee-repository-writer';
import SequelizeVisitRepositoryReader from '@triumph/sequelize-adapter/src/repositories/visit/visit-repository-reader';

import { GuaranteeReaderController } from '../../controllers/guarantee/guarantee-controller';
import { GuaranteeWriterController } from '../../controllers/guarantee/guarantee-controller-writer';
import { GuaranteeService } from '../../modules/guarantee/guarantee-services';

@Module({
  controllers: [GuaranteeWriterController, GuaranteeReaderController],
  providers: [
    GuaranteeService,
    {
      provide: 'GuaranteeRepositoryWriter',
      useClass: SequelizeGuaranteeRepositoryWriter,
    },
    {
      provide: 'GuaranteeRepositoryReader',
      useClass: SequelizeGuaranteeRepositoryReader,
    },
    {
      provide: 'VisitRepositoryReader',
      useClass: SequelizeVisitRepositoryReader,
    },
    CreateGuaranteeCommandHandler,
    GetGuaranteeListQueryHandler,
    GetGuaranteeQueryHandler,
    SearchGuaranteeQueryHandler,
  ],
})
export class GuaranteeModule {}
