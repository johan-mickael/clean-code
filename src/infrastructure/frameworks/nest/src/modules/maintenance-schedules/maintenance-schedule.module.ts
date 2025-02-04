import { Module } from '@nestjs/common';

import MaintenanceScheduleWriterController from '../../controllers/maintenance-schedules/maintenance-schedule.writer.controller';
import { BusModule } from '../bus-consumer/bus.module';
import {
  BikeModelRepositoryReaderProvider,
  CreatePreventiveMaintenanceScheduleForBikeModelUseCaseProvider,
  MaintenanceScheduleRepositoryWriterProvider,
} from './maintenance-schedule.provider';

@Module({
  imports: [BusModule],
  controllers: [MaintenanceScheduleWriterController],
  providers: [
    MaintenanceScheduleRepositoryWriterProvider,
    BikeModelRepositoryReaderProvider,
    CreatePreventiveMaintenanceScheduleForBikeModelUseCaseProvider,
  ],
  exports: [],
})
export class MaintenanceScheduleModule {}
