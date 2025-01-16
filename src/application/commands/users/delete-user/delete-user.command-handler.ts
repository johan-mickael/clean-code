import UserRepositoryWriter from '../../../ports/repositories/writers/user-repository-writer';
import DeleteUserCommand from './delete-user.command';

export default class DeleteUserCommandHandler {
  constructor(private readonly userRepositoryWriter: UserRepositoryWriter) {}

  async execute(deleteUserCommand: DeleteUserCommand): Promise<void> {
    const userIdInput = deleteUserCommand.userId;

    await this.userRepositoryWriter.delete(userIdInput);
  }
}
