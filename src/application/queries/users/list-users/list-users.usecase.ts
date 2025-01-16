import UserDTO from '../../../interfaces/dtos/user.dto';
import ListUsersQuery from './list-users.query';

export default abstract class ListUsersUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listUsersQuery: ListUsersQuery): Promise<UserDTO[]>;
}
