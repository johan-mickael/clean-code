import { Module } from '@nestjs/common';
import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer.repository-reader';
import SequelizeDealerRepository from '@triumph/sequelize-adapter/src/repositories/readers/dealer.repository-reader';

import DealerReaderController from '../../controllers/dealers/dealer.reader.controller';
import { GetDealerByIdentifierUseCaseProvider, ListDealersUseCaseProvider } from './dealer.provider';

@Module({
  imports: [],
  controllers: [DealerReaderController],
  providers: [
    {
      provide: DealerRepositoryReader,
      useClass: SequelizeDealerRepository,
    },
    ListDealersUseCaseProvider,
    GetDealerByIdentifierUseCaseProvider,
  ],
  exports: [
    DealerRepositoryReader, // Ajoutez ceci pour rendre le provider accessible à d'autres modules
  ],
})
export class DealerModule {}
