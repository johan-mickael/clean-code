import CreateUserCommandHandler from '@triumph/application/commands/users/create-user/create-user.command-handler';
import CreateUserUseCase from '@triumph/application/commands/users/create-user/create-user.usecase';
import DeleteUserCommandHandler from '@triumph/application/commands/users/delete-user/delete-user.command-handler';
import DeleteUserUseCase from '@triumph/application/commands/users/delete-user/delete-user.usecase';
import UpdateUserCommandHandler from '@triumph/application/commands/users/update-user/update-user.command-handler';
import UpdateUserUseCase from '@triumph/application/commands/users/update-user/update-user.usecase';
import DealerRepositoryReader from '@triumph/application/ports/repositories/readers/dealer.repository-reader';
import UserRepositoryReader from '@triumph/application/ports/repositories/readers/user-repository-reader';
import UserRepositoryWriter from '@triumph/application/ports/repositories/writers/user-repository-writer';
import GetUserByIdentifierQueryHandler from '@triumph/application/queries/users/get-user-by-identifier/get-user-by-identifier.query-handler';
import GetUserByIdentifierUseCase from '@triumph/application/queries/users/get-user-by-identifier/get-user-by-identifier.usecase';
import ListUsersQueryHandler from '@triumph/application/queries/users/list-users/list-users.query-handler';
import ListUsersUseCase from '@triumph/application/queries/users/list-users/list-users.usecase';

export const ListUsersUseCaseProvider = {
  provide: ListUsersUseCase,
  useFactory: (userRepositoryReader: UserRepositoryReader) => new ListUsersQueryHandler(userRepositoryReader),
  inject: [UserRepositoryReader],
};

export const GetUserByIdentifierUseCaseProvider = {
  provide: GetUserByIdentifierUseCase,
  useFactory: (userRepositoryReader: UserRepositoryReader) => new GetUserByIdentifierQueryHandler(userRepositoryReader),
  inject: [UserRepositoryReader],
};

export const CreateUserUseCaseProvider = {
  provide: CreateUserUseCase,
  useFactory: (userRepositoryWriter: UserRepositoryWriter, dealerRepositoryReader: DealerRepositoryReader) =>
    new CreateUserCommandHandler(userRepositoryWriter, dealerRepositoryReader),
  inject: [UserRepositoryWriter, DealerRepositoryReader],
};

export const UpdateUserUseCaseProvider = {
  provide: UpdateUserUseCase,
  useFactory: (userRepositoryWriter: UserRepositoryWriter, dealerRepositoryReader: DealerRepositoryReader) =>
    new UpdateUserCommandHandler(userRepositoryWriter, dealerRepositoryReader),
  inject: [UserRepositoryWriter, DealerRepositoryReader],
};

export const DeleteUserUseCaseProvider = {
  provide: DeleteUserUseCase,
  useFactory: (userRepositoryWriter: UserRepositoryWriter) => new DeleteUserCommandHandler(userRepositoryWriter),
  inject: [UserRepositoryWriter],
};
