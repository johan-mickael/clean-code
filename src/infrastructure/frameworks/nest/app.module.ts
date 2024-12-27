import { Module } from '@nestjs/common';
import { OccupationModule } from './src/modules/occupation-module';
import { DealerModule } from './src/modules/dealer-module';

@Module({
  imports: [
    DealerModule,
    OccupationModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
