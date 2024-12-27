import { Module } from '@nestjs/common';
import { OccupationModule } from './src/modules/occupation-module';
import { DatabaseAdapterModule } from './src/modules/database-adapter-module';
import { DealerModule } from './src/modules/dealer-module';

@Module({
  imports: [
    DatabaseAdapterModule,
    DealerModule,
    OccupationModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
