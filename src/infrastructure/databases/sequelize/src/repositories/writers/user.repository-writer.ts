import { Error as SequelizeError } from 'sequelize';

import UserDTO from '@triumph/application/interfaces/dtos/user.dto';
import UserDTOMapper from '@triumph/application/interfaces/mappers/user.dto-mapper';
import UserRepositoryWriter from '@triumph/application/ports/repositories/writers/user-repository-writer';
import User from '@triumph/domain/entity/user';
import { UserNotFoundError } from '@triumph/domain/errors/users/user-not-found.error';

import UserModel from '../../models/user.model';

export default class SequelizeUserRepositoryWriter implements UserRepositoryWriter {
  async create(userDTO: UserDTO): Promise<User> {
    const userModel = await UserModel.create({
      email: userDTO.email,
      password: userDTO.password,
      firstname: userDTO.firstname,
      lastname: userDTO.lastname,
      dealerId: userDTO.dealerId,
    });

    return UserDTOMapper.toEntity(userModel);
  }

  async update(id: string, userDTO: UserDTO): Promise<User> {
    try {
      const [affectedUserCount, updatedUsers] = await UserModel.update(
        {
          email: userDTO.email,
          password: userDTO.password,
          firstname: userDTO.firstname,
          lastname: userDTO.lastname,
          dealerId: userDTO.dealerId,
        },
        {
          where: { id },
          returning: true,
        },
      );

      if (affectedUserCount === 0) {
        throw new UserNotFoundError();
      }

      const updatedUser = updatedUsers[0];
      return UserDTOMapper.toEntity(updatedUser);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        throw new UserNotFoundError();
      }

      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const deletedUserCount = await UserModel.destroy({
        where: { id },
      });

      if (deletedUserCount === 0) {
        throw new UserNotFoundError();
      }

      return Promise.resolve();
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        throw new UserNotFoundError();
      }

      throw error;
    }
  }
}
