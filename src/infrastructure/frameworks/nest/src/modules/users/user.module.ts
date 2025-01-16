import { Module } from '@nestjs/common';
import { DealerModule } from '../../../src/modules/dealers/dealer.module'; // Importez DealerModule ici
import UserRepositoryReader from '@triumph/application/ports/repositories/readers/user-repository-reader';
import UserRepositoryWriter from '@triumph/application/ports/repositories/writers/user-repository-writer';
import SequelizeUserRepositoryReader from '@triumph/sequelize-adapter/src/repositories/readers/user.repository-reader';
import SequelizeUserRepositoryWriter from '@triumph/sequelize-adapter/src/repositories/writers/user.repository-writer';

import UserReaderController from '../../controllers/users/user.reader.controller';
import UserWriterController from '../../controllers/users/user.writer.controller';
import {
  CreateUserUseCaseProvider,
  UpdateUserUseCaseProvider,
  DeleteUserUseCaseProvider,
  GetUserByIdentifierUseCaseProvider,
  ListUsersUseCaseProvider,
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
