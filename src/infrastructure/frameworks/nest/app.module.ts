import { Module } from '@nestjs/common';
import { OccupationModule } from './src/modules/occupation-module';
import { DealerModule } from './src/modules/dealer-module';
import { PartnerModule } from './src/modules/partner-module';

@Module({
  imports: [
    DealerModule,
    PartnerModule,
    OccupationModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
