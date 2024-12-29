import { Module } from '@nestjs/common';
import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer-repository-reader';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/readers/dealer-repository-reader';

import DealerController from '../controllers/dealer-controller';

@Module({
  imports: [],
  controllers: [DealerController],
  providers: [
    {
      provide: DealerRepositoryReader,
      useClass: SequelizeDealerRepository,
    },
  ],
  exports: [],
})
export class DealerModule {}
