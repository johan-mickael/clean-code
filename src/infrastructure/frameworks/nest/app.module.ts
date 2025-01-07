import { Module } from '@nestjs/common';
import SequelizeAdapter from '@triumph/sequelize-adapter/src';
import DatabaseAdapter from '@triumph/shared-infrastructure/database-adapter/database-adapter.interface';

import { BikeModelModule } from './src/modules/bike-models/bike-model.module';
import { BikeModule } from './src/modules/bike/bike-module';
import { CustomerEventModule } from './src/modules/customer-event/customer-event-module';
import { CustomerModule } from './src/modules/customer/customer-module';
import { DealerModule } from './src/modules/dealers/dealer.module';
import { DrivingLicenseModule } from './src/modules/driving_license/driving-license-module';
import { EventModule } from './src/modules/event/event-module';
import { GuaranteeModule } from './src/modules/guarantee/guarantee-module';
import { OccupationModule } from './src/modules/occupation/occupation-module';
import { PartnerModule } from './src/modules/partners/partner.module';
import { TrialModule } from './src/modules/trial/trial-module';
import { VisitModule } from './src/modules/visit/visit-module';

@Module({
  imports: [
    CustomerModule,
    OccupationModule,
    BikeModule,
    CustomerEventModule,
    DrivingLicenseModule,
    EventModule,
    GuaranteeModule,
    VisitModule,
    TrialModule,
    BikeModelModule,
    DealerModule,
    PartnerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: DatabaseAdapter,
      useClass: SequelizeAdapter,
    },
  ],
  exports: [DatabaseAdapter],
})
export class AppModule {}
