import { Module } from '@nestjs/common';
import SparePartRepositoryReader from '@triumph/application/ports/repositories/readers/spare-part-repository-reader';
import SparePartRepositoryWriter from '@triumph/application/ports/repositories/writers/spare-part-repository-writer';
import SequelizeSparePartRepository from '@triumph/sequelize-adapter/src/repositories/readers/spare-part.repository-reader';
import SequelizeSparePartRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/spare-part.repository-writer';

import SparePartReaderController from '../../controllers/spare-parts/spare-part.reader.controller';
import SparePartWriterController from '../../controllers/spare-parts/spare-part.writer.controller';
import {
  CreateSparePartUseCaseProvider,
  DeleteSparePartUseCaseProvider,
  GetSparePartByIdentifierUseCaseProvider,
  ListSparePartsUseCaseProvider,
  UpdateSparePartUseCaseProvider,
} from './spare-part.provider';
import { NotificationModule } from '../notifications/notification.module';
import { SparePartNotificationService } from '../../services/notifications/spare-part-notification.service';

@Module({
  imports: [NotificationModule],
  controllers: [SparePartReaderController, SparePartWriterController],
  providers: [
    {
      provide: SparePartRepositoryReader,
      useClass: SequelizeSparePartRepository,
    },
    {
      provide: SparePartRepositoryWriter,
      useClass: SequelizeSparePartRepositoryWriter,
    },
    SparePartNotificationService,
    ListSparePartsUseCaseProvider,
    GetSparePartByIdentifierUseCaseProvider,
    CreateSparePartUseCaseProvider,
    UpdateSparePartUseCaseProvider,
    DeleteSparePartUseCaseProvider,
  ],
  exports: [SparePartRepositoryReader, SparePartRepositoryWriter],
})
export class SparePartModule {}
