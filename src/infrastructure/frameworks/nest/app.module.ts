import { Module } from '@nestjs/common';
import { DealerModule } from './src/modules/dealer-module';
import { PartnerModule } from './src/modules/partner-module';

@Module({
  imports: [
    DealerModule,
    PartnerModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
