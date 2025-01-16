import { Module } from '@nestjs/common';
import SpareOrderRepositoryReader from '@triumph/application/ports/repositories/readers/spare-order-repository-reader';
import SpareOrderRepositoryWriter from '@triumph/application/ports/repositories/writers/spare-order-repository-writer';
import SequelizeSpareOrderRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/spare-order.repository-reader';
import SequelizeSpareOrderRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/spare-order.repository-writer';

import SpareOrderReaderController from '../../controllers/spare-orders/spare-order.reader.controller';
import SpareOrderWriterController from '../../controllers/spare-orders/spare-order.writer.controller';
import {
  CreateSpareOrderUseCaseProvider,
  UpdateSpareOrderUseCaseProvider,
  DeleteSpareOrderUseCaseProvider,
  GetSpareOrderByIdentifierUseCaseProvider,
  ListSpareOrdersUseCaseProvider,
} from './spare-order.provider';

@Module({
  imports: [],
  controllers: [SpareOrderReaderController, SpareOrderWriterController],
  providers: [
    {
      provide: SpareOrderRepositoryReader,
      useClass: SequelizeSpareOrderRepositoryReader,
    },
    {
      provide: SpareOrderRepositoryWriter,
      useClass: SequelizeSpareOrderRepositoryWriter,
    },
    ListSpareOrdersUseCaseProvider,
    GetSpareOrderByIdentifierUseCaseProvider,
    CreateSpareOrderUseCaseProvider,
    UpdateSpareOrderUseCaseProvider,
    DeleteSpareOrderUseCaseProvider,
  ],
  exports: [],
})
export class SpareOrdersModule {}
