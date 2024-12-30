import { Module } from '@nestjs/common';

import { BikeModelModule } from './src/modules/bike-model.module';
import { DealerModule } from './src/modules/dealers/dealer.module';
import { PartnerModule } from './src/modules/partners/partner.module';

@Module({
  imports: [
    BikeModelModule,
    DealerModule,
    PartnerModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
