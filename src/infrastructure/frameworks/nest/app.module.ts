import { Module } from '@nestjs/common';
import { OccupationModule } from './src/modules/occupation-module';
import { DatabaseAdapterModule } from './src/modules/database-adapter-module';

@Module({
  imports: [
    DatabaseAdapterModule,
    OccupationModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
