import DriverLicenseEntity from '@triumph/domain/entity/driver-license';

import DriverLicenseDTO from '../../../interfaces/dtos/driver-license.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class DriverLicenseRepositoryWriter extends BaseRepositoryWriter<
  DriverLicenseEntity,
  DriverLicenseDTO
> {}
