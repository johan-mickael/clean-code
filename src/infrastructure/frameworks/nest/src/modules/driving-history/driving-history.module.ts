import { Module } from '@nestjs/common';
import DrivingHistoryRepositoryReader from '@triumph/application/ports/repositories/readers/driving-history-repository-reader';
import DrivingHistoryRepositoryWriter from '@triumph/application/ports/repositories/writers/driving-history-repository-writer';
import SequelizeDrivingHistoryRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/driving-history.repository-reader';
import SequelizeDrivingHistoryRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/driving-history.repository-writer';

import DrivingHistoryReaderController from '../../controllers/driving-history/driving-history.reader.controller';
import DrivingHistoryWriterController from '../../controllers/driving-history/driving-history.writer.controller';
import {
  CreateDrivingHistoryUseCaseProvider,
  DeleteDrivingHistoryUseCaseProvider,
  GetDrivingHistoryByIdentifierUseCaseProvider,
  ListDrivingHistoryUseCaseProvider,
  UpdateDrivingHistoryUseCaseProvider,
} from './driving-history.provider';

@Module({
  imports: [],
  controllers: [DrivingHistoryReaderController, DrivingHistoryWriterController],
  providers: [
    {
      provide: DrivingHistoryRepositoryReader,
      useClass: SequelizeDrivingHistoryRepositoryReader,
    },
    {
      provide: DrivingHistoryRepositoryWriter,
      useClass: SequelizeDrivingHistoryRepositoryWriter,
    },
    ListDrivingHistoryUseCaseProvider,
    GetDrivingHistoryByIdentifierUseCaseProvider,
    CreateDrivingHistoryUseCaseProvider,
    UpdateDrivingHistoryUseCaseProvider,
    DeleteDrivingHistoryUseCaseProvider,
  ],
  exports: [],
})
export class DrivingHistoryModule {}
