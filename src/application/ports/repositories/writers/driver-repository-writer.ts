import DriverEntity from '@triumph/domain/entity/driver';

import DriverDTO from '../../../interfaces/dtos/driver.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class DriverRepositoryWriter extends BaseRepositoryWriter<DriverEntity, DriverDTO> {}
