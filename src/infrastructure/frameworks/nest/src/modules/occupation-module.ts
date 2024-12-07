import { Module } from '@nestjs/common';
import OccupationController from '../controllers/occupation-controller';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import InMemoryOccupationRepository from '@triumph/in-memory-database-infrastructure/occupation-repository-reader';

@Module({
  imports: [],
  controllers: [OccupationController],
  providers: [
    {
      provide: OccupationRepositoryReader,
      useClass: InMemoryOccupationRepository,
    },
  ],
})
export class OccupationModule {}
