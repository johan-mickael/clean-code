import SparePartEntity from '@triumph/domain/entity/spare-part';

import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class SparePartRepositoryWriter extends BaseRepositoryWriter<SparePartEntity, SparePartDTO> {}
