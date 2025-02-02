import UserEntity from '@triumph/domain/entity/user';

import UserDTO from '../../../interfaces/dtos/user.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class UserRepositoryWriter extends BaseRepositoryWriter<UserEntity, UserDTO> {}
