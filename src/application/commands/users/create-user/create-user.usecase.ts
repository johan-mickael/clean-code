import UserDTO from '../../../interfaces/dtos/user.dto';
import CreateUserCommand from './create-user.command';

export default abstract class CreateUserUseCase {
  /**
   * @throws InvalidCommandError
   */
  abstract execute(createUserCommand: CreateUserCommand): Promise<UserDTO>;
}
