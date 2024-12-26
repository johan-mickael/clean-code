import { Module } from '@nestjs/common';
import OccupationController from '../controllers/occupation-controller';
import { OccupationRepositoryProvider } from './occupation-provider';
import { DatabaseAdapterModule } from './database-adapter-module';

@Module({
  imports: [DatabaseAdapterModule],
  controllers: [OccupationController],
  providers: [OccupationRepositoryProvider],
  exports: [OccupationRepositoryProvider],
})
export class OccupationModule {}
