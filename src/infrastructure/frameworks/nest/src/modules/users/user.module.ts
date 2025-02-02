import { Module } from '@nestjs/common';
// Importez DealerModule ici
import UserRepositoryReader from '@triumph/application/ports/repositories/readers/user-repository-reader';
import UserRepositoryWriter from '@triumph/application/ports/repositories/writers/user-repository-writer';
import SequelizeUserRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/user.repository-reader';
import SequelizeUserRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/user.repository-writer';

import { DealerModule } from '../../../src/modules/dealers/dealer.module';
import UserReaderController from '../../controllers/users/user.reader.controller';
import UserWriterController from '../../controllers/users/user.writer.controller';
import {
  CreateUserUseCaseProvider,
  DeleteUserUseCaseProvider,
  GetUserByIdentifierUseCaseProvider,
  ListUsersUseCaseProvider,
  UpdateUserUseCaseProvider,
} from './user.provider';

@Module({
  imports: [
    DealerModule, // Assurez-vous d'importer DealerModule ici
  ],
  controllers: [UserReaderController, UserWriterController],
  providers: [
    {
      provide: UserRepositoryReader,
      useClass: SequelizeUserRepositoryReader,
    },
    {
      provide: UserRepositoryWriter,
      useClass: SequelizeUserRepositoryWriter,
    },
    ListUsersUseCaseProvider,
    GetUserByIdentifierUseCaseProvider,
    CreateUserUseCaseProvider,
    UpdateUserUseCaseProvider,
    DeleteUserUseCaseProvider,
  ],
  exports: [],
})
export class UserModule {}
