import { Module } from '@nestjs/common';
import DealerController from '../controllers/dealer-controller';
import { DealerRepositoryProvider } from './dealer-provider';
import { DatabaseAdapterModule } from './database-adapter-module';

@Module({
  imports: [DatabaseAdapterModule],
  controllers: [DealerController],
  providers: [DealerRepositoryProvider],
  exports: [DealerRepositoryProvider],
})
export class DealerModule {}
