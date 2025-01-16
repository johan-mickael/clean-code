import UserDTO from '../../../interfaces/dtos/user.dto';
import UserDTOMapper from '../../../interfaces/mappers/user.dto-mapper';
import UserRepositoryReader from '../../../ports/repositories/readers/user-repository-reader';
import ListUsersQuery from './list-users.query';

export default class ListUsersQueryHandler {
  constructor(private readonly userRepositoryReader: UserRepositoryReader) {}

  async execute(listUsersQuery: ListUsersQuery): Promise<UserDTO[]> {
    const users = await this.userRepositoryReader.list();

    return users.map(UserDTOMapper.toDTO);
  }
}
