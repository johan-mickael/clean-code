import { Module } from '@nestjs/common';

import MaintenanceScheduleWriterController from '../../controllers/maintenance-schedules/maintenance-schedule.writer.controller';
import { BusModule } from '../bus-consumer/bus.module';
import {
  BikeModelRepositoryReaderProvider,
  CreatePreventiveMaintenanceScheduleForBikeModelUseCaseProvider,
  MaintenanceScheduleRepositoryReaderProvider,
  MaintenanceScheduleRepositoryWriterProvider,
} from './maintenance-schedule.provider';

@Module({
  imports: [BusModule],
  controllers: [MaintenanceScheduleWriterController],
  providers: [
    MaintenanceScheduleRepositoryReaderProvider,
    MaintenanceScheduleRepositoryWriterProvider,
    BikeModelRepositoryReaderProvider,
    CreatePreventiveMaintenanceScheduleForBikeModelUseCaseProvider,
  ],
  exports: [MaintenanceScheduleRepositoryReaderProvider, MaintenanceScheduleRepositoryWriterProvider],
})
export class MaintenanceScheduleModule {}
