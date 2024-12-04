import { Module } from '@nestjs/common';
import { CustomerModule } from './src/modules/customer-module';

@Module({
  imports: [
    CustomerModule,
    // Add your modules here
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
