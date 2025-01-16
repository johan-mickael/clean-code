import UserDTO from '../../../interfaces/dtos/user.dto';
import UpdateUserCommand from './update-user.command';

export default abstract class UpdateUserUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(updateUserCommand: UpdateUserCommand): Promise<UserDTO>;
}
