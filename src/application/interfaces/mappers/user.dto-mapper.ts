import User from '@triumph/domain/entity/user';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';

import UserDTO from '../dtos/user.dto';

export default class UserDTOMapper {
  static toDTO(userEntity: User): UserDTO {
    return new UserDTO(
      userEntity.id,
      userEntity.email,
      userEntity.password,
      userEntity.firstname,
      userEntity.lastname,
      userEntity.dealerId,
    );
  }

  static toEntity(userDTO: UserDTO): User {
    const { id, email, password, firstname, lastname, dealerId } = userDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new User(id, email, password, firstname, lastname, dealerId);
  }
}
