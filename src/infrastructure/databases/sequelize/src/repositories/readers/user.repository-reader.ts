import { Error as SequelizeError } from 'sequelize';

import UserRepositoryReader from '@triumph/application/ports/repositories/readers/user-repository-reader';
import User from '@triumph/domain/entity/user';

import UserModel from '../../models/user.model';

export default class SequelizeUserRepository implements UserRepositoryReader {
  async list(): Promise<User[]> {
    const users = await UserModel.findAll();

    return users.map(
      (user) => new User(user.id, user.email, user.password, user.firstname, user.lastname, user.dealerId),
    );
  }

  async getById(id: string): Promise<User | null> {
    try {
      const user = await UserModel.findByPk(id);

      if (!user) {
        return null;
      }

      return new User(user.id, user.email, user.password, user.firstname, user.lastname, user.dealerId);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }

  async getByEmail(email: string): Promise<User | null> {
    try {
      const user = await UserModel.findOne({
        where: { email },
      });

      if (!user) {
        return null;
      }

      return new User(user.id, user.email, user.password, user.firstname, user.lastname, user.dealerId);
    } catch (error: unknown) {
      if (error instanceof SequelizeError) {
        console.error(error);
        return null;
      }

      throw error;
    }
  }
}
