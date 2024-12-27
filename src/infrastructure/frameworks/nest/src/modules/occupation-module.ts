import { Module } from '@nestjs/common';
import OccupationController from '../controllers/occupation-controller';
import SequelizeOccupationRepository from '@triumph/sequelize-adapter/src/repositories/occupation-repository-reader';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';

@Module({
  imports: [],
  controllers: [OccupationController],
  providers: [
    {
      provide: OccupationRepositoryReader,
      useClass: SequelizeOccupationRepository,
    }
  ],
  exports: [],
})
export class OccupationModule {}
