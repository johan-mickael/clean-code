import { Module } from '@nestjs/common';
import MaintenanceRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-repository-reader';
import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';
import SequelizeMaintenanceRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/maintenance.repository-reader';
import SequelizeMaintenanceRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/maintenance.repository-writer';
import { BikeModule } from '../bikes/bike.module'; // Adaptez le chemin

import MaintenanceReaderController from '../../controllers/maintenances/maintenance.reader.controller';
import MaintenanceWriterController from '../../controllers/maintenances/maintenance.writer.controller';
import {
  CreateMaintenanceUseCaseProvider,
  UpdateMaintenanceUseCaseProvider,
  DeleteMaintenanceUseCaseProvider,
  GetMaintenanceByIdentifierUseCaseProvider,
  ListMaintenancesUseCaseProvider,
} from './maintenance.provider';

@Module({
  imports: [BikeModule],
  controllers: [MaintenanceReaderController, MaintenanceWriterController],
  providers: [
    {
      provide: MaintenanceRepositoryReader,
      useClass: SequelizeMaintenanceRepositoryReader,
    },
    {
      provide: MaintenanceRepositoryWriter,
      useClass: SequelizeMaintenanceRepositoryWriter,
    },
    ListMaintenancesUseCaseProvider,
    GetMaintenanceByIdentifierUseCaseProvider,
    CreateMaintenanceUseCaseProvider,
    UpdateMaintenanceUseCaseProvider,
    DeleteMaintenanceUseCaseProvider,
  ],
  exports: [],
})
export class MaintenanceModule {}
