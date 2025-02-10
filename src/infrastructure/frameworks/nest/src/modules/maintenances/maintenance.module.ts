import { Module } from '@nestjs/common';
import BikeRepositoryReader from '@triumph/application/ports/repositories/readers/bike-repository-reader';
import MaintenanceRepositoryReader from '@triumph/application/ports/repositories/readers/maintenance-repository-reader';
import MaintenanceRepositoryWriter from '@triumph/application/ports/repositories/writers/maintenance-repository-writer';
import MongooseMaintenanceRepositoryReader from '@triumph/mongoose-adapter/src/repositories/readers/maintenance.repository-reader';
import MongooseMaintenanceRepositoryWriter from '@triumph/mongoose-adapter/src/repositories/writers/maintenance.repository-writer';
import SequelizeBikeRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/bike.repository-reader';

import MaintenanceWriterController from '../../controllers/maintenances/maintenance.writer.controller';
import { BikeModule } from '../bikes/bike.module';
import { BusModule } from '../bus-consumer/bus.module';
import { CreateCurativeMaintenanceForBikeUseCaseProvider } from './maintenance.provider';

@Module({
  imports: [BikeModule, BusModule],
  controllers: [MaintenanceWriterController],
  providers: [
    {
      provide: BikeRepositoryReader,
      useClass: SequelizeBikeRepositoryReader,
    },
    {
      provide: MaintenanceRepositoryReader,
      useClass: MongooseMaintenanceRepositoryReader,
    },
    {
      provide: MaintenanceRepositoryWriter,
      useClass: MongooseMaintenanceRepositoryWriter,
    },
    CreateCurativeMaintenanceForBikeUseCaseProvider,
  ],
  exports: [MaintenanceRepositoryReader, MaintenanceRepositoryWriter],
})
export class MaintenanceModule {}
