import { Module } from '@nestjs/common';
import OccupationController from '../controllers/occupation-controller';
import OccupationRepositoryReader from '@triumph/application/ports/repositories/occupation-repository-reader';
import SequelizeOccupationRepository from '../../../../databases/sequelize/src/repositories/occupation-repository-reader';

@Module({
  imports: [],
  controllers: [OccupationController],
  providers: [
    {
      provide: OccupationRepositoryReader,
      useClass: SequelizeOccupationRepository,
    },
  ],
})
export class OccupationModule {}
