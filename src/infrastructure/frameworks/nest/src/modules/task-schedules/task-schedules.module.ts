import { Module } from '@nestjs/common';

import { CheckAllDueMaintenancesForBikesDailyTask } from '../../task-schedules/check-all-due-maintenances-for-bikes.daily.task';
import { BikeModule } from '../bikes/bike.module';
import { BusModule } from '../bus-consumer/bus.module';
import { MaintenanceScheduleModule } from '../maintenance-schedules/maintenance-schedule.module';
import { MaintenanceModule } from '../maintenances/maintenance.module';
import { UtilitiesModule } from '../utilities/utilities.module';
import { CheckAllDueMaintenancesForBikesUsecaseProvider, SchedulerProvider } from './task-schedules.provider';

@Module({
  imports: [UtilitiesModule, BusModule, BikeModule, MaintenanceScheduleModule, MaintenanceModule],
  providers: [
    SchedulerProvider,
    CheckAllDueMaintenancesForBikesUsecaseProvider,
    CheckAllDueMaintenancesForBikesDailyTask,
  ],
  exports: [CheckAllDueMaintenancesForBikesDailyTask],
})
export class TaskSchedulesModule {}
