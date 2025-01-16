import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found.error';

import UserDTO from '../../../interfaces/dtos/user.dto';
import UserDTOMapper from '../../../interfaces/mappers/user.dto-mapper';
import DealerRepositoryReader from '../../../ports/repositories/readers/dealer.repository-reader';
import UserRepositoryWriter from '../../../ports/repositories/writers/user-repository-writer';
import UpdateUserCommand from './update-user.command';

export default class UpdateUserCommandHandler {
  constructor(
    private readonly userRepositoryWriter: UserRepositoryWriter,
    private readonly dealerRepositoryReader: DealerRepositoryReader,
  ) {}

  async execute(updateUserCommand: UpdateUserCommand): Promise<UserDTO> {
    const { userId, userPayload } = updateUserCommand;
    const { email, password, firstname, lastname, dealerId } = userPayload;

    if (dealerId) {
      const dealerExists = await this.dealerRepositoryReader.getById(dealerId);
      if (!dealerExists) {
        throw new DealerNotFoundError();
      }
    }

    const userDTO = new UserDTO(userId, email, password, firstname, lastname, dealerId);
    const updatedUser = await this.userRepositoryWriter.update(userId, userDTO);

    return UserDTOMapper.toDTO(updatedUser);
  }
}
