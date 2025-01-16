import { DealerNotFoundError } from '@triumph/domain/errors/dealers/dealer-not-found.error';

import UserDTO from '../../../interfaces/dtos/user.dto';
import UserDTOMapper from '../../../interfaces/mappers/user.dto-mapper';
import DealerRepositoryReader from '../../../ports/repositories/readers/dealer.repository-reader';
import UserRepositoryWriter from '../../../ports/repositories/writers/user-repository-writer';
import CreateUserCommand from './create-user.command';

export default class CreateUserCommandHandler {
  constructor(
    private readonly userRepositoryWriter: UserRepositoryWriter,
    private readonly dealerRepositoryReader: DealerRepositoryReader,
  ) {}

  async execute(createUserCommand: CreateUserCommand): Promise<UserDTO> {
    const { email, password, firstname, lastname, dealerId } = createUserCommand.userPayload;

    if (dealerId) {
      const dealerExists = await this.dealerRepositoryReader.getById(dealerId);
      if (!dealerExists) {
        throw new DealerNotFoundError();
      }
    }

    const userDTO = new UserDTO(null, email, password, firstname, lastname, dealerId);
    const createdUser = await this.userRepositoryWriter.create(userDTO);

    return UserDTOMapper.toDTO(createdUser);
  }
}
