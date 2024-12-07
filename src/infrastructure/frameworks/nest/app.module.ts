import { Module } from '@nestjs/common';
import { CustomerModule } from './src/modules/customer-module';
import { OccupationModule } from './src/modules/occupation-module';

@Module({
  imports: [
    CustomerModule,
    OccupationModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
