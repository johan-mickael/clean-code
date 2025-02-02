import { UserNotFoundError } from '@triumph/domain/errors/users/user-not-found.error';

import UserDTO from '../../../interfaces/dtos/user.dto';
import UserDTOMapper from '../../../interfaces/mappers/user.dto-mapper';
import UserRepositoryReader from '../../../ports/repositories/readers/user-repository-reader';
import GetUserByIdQuery from './get-user-by-identifier.query';

export default class GetUserByIdQueryHandler {
  constructor(private readonly userRepository: UserRepositoryReader) {}

  async execute(getUserByIdQuery: GetUserByIdQuery): Promise<UserDTO> {
    const userIdInput = getUserByIdQuery.id;
    const foundUser = await this.userRepository.getById(userIdInput);

    if (foundUser !== null) {
      return UserDTOMapper.toDTO(foundUser);
    }

    throw new UserNotFoundError();
  }
}
