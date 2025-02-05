import { Module } from '@nestjs/common';

import { BikeModelModule } from './src/modules/bike-models/bike-model.module';
import { BikeModule } from './src/modules/bikes/bike.module';
import { BusModule } from './src/modules/bus-consumer/bus.module';
import { DealerModule } from './src/modules/dealers/dealer.module';
import { DriverLicenseModule } from './src/modules/driver-licenses/driver-license.module';
import { DriversModule } from './src/modules/drivers/driver.module';
import { DrivingHistoryModule } from './src/modules/driving-history/driving-history.module';
import { DrivingIncidentsModule } from './src/modules/driving-incidents/driving-incident.module';
import { MaintenanceDetailsModule } from './src/modules/maintenance-details/maintenance-detail.module';
import { MaintenanceScheduleModule } from './src/modules/maintenance-schedules/maintenance-schedule.module';
import { MaintenanceModule } from './src/modules/maintenances/maintenance.module';
import { NotificationModule } from './src/modules/notifications/notification.module';
import { PartnerModule } from './src/modules/partners/partner.module';
import { SpareOrdersModule } from './src/modules/spare-orders/spare-order.module';
import { SparePartModule } from './src/modules/spare-parts/spare-part.module';
import { UserModule } from './src/modules/users/user.module';

@Module({
  imports: [
    BikeModule,
    BikeModelModule,
    DealerModule,
    PartnerModule,
    MaintenanceScheduleModule,
    DriverLicenseModule,
    DriversModule,
    DrivingHistoryModule,
    DrivingIncidentsModule,
    MaintenanceDetailsModule,
    MaintenanceModule,
    SpareOrdersModule,
    SparePartModule,
    UserModule,
    NotificationModule,
    BusModule,
  ],
})
export class AppModule {}
