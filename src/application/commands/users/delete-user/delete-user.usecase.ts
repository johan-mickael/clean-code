import DeleteUserCommand from './delete-user.command';

export default abstract class DeleteUserUseCase {
  /**
   * @throws InvalidCommandError
   * @throws UserNotFoundError
   */
  abstract execute(deleteUserCommand: DeleteUserCommand): Promise<void>;
}
