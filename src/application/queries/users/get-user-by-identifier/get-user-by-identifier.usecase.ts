import UserDTO from '../../../interfaces/dtos/user.dto';
import GetUserByIdentifierQuery from './get-user-by-identifier.query';

export default abstract class GetUserByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws UserNotFoundError
   */
  abstract execute(getUserByIdentifierQuery: GetUserByIdentifierQuery): Promise<UserDTO>;
}
