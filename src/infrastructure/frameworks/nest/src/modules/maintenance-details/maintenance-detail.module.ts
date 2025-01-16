import { Module } from '@nestjs/common';
import MaintenanceDetailRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-detail-repository-reader';
import MaintenanceDetailRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-detail-repository-writer';
import SequelizeMaintenanceDetailRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/maintenance-detail.repository-reader';
import SequelizeMaintenanceDetailRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/maintenance-detail.repository-writer';

import MaintenanceDetailReaderController from '../../controllers/maintenance-details/maintenance-detail.reader.controller';
import MaintenanceDetailWriterController from '../../controllers/maintenance-details/maintenance-detail.writer.controller';
import {
  CreateMaintenanceDetailUseCaseProvider,
  UpdateMaintenanceDetailUseCaseProvider,
  DeleteMaintenanceDetailUseCaseProvider,
  GetMaintenanceDetailByIdentifierUseCaseProvider,
  ListMaintenanceDetailsUseCaseProvider,
} from './maintenance-detail.provider';

@Module({
  imports: [],
  controllers: [MaintenanceDetailReaderController, MaintenanceDetailWriterController],
  providers: [
    {
      provide: MaintenanceDetailRepositoryReader,
      useClass: SequelizeMaintenanceDetailRepositoryReader,
    },
    {
      provide: MaintenanceDetailRepositoryWriter,
      useClass: SequelizeMaintenanceDetailRepositoryWriter,
    },
    ListMaintenanceDetailsUseCaseProvider,
    GetMaintenanceDetailByIdentifierUseCaseProvider,
    CreateMaintenanceDetailUseCaseProvider,
    UpdateMaintenanceDetailUseCaseProvider,
    DeleteMaintenanceDetailUseCaseProvider,
  ],
  exports: [],
})
export class MaintenanceDetailsModule {}
