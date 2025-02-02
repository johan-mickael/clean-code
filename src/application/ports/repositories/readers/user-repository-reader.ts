import UserEntity from '@triumph/domain/entity/user';

import BaseRepositoryReader from './base.repository-reader';

export default abstract class UserRepositoryReader extends BaseRepositoryReader<UserEntity> {}
