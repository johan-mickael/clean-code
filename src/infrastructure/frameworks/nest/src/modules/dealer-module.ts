import { Module } from '@nestjs/common';
import DealerController from '../controllers/dealer-controller';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/dealer-repository-reader';
import DealerRepositoryReader from '@triumph/application/ports/repositories/dealer-repository-reader';

@Module({
  imports: [],
  controllers: [DealerController],
  providers: [
    {
      provide: DealerRepositoryReader,
      useClass: SequelizeDealerRepository,
    }
  ],
  exports: [],
})
export class DealerModule {}
