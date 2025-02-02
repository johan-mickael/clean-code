import SpareOrderEntity from '@triumph/domain/entity/spare-order';

import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class SpareOrderRepositoryWriter extends BaseRepositoryWriter<
  SpareOrderEntity,
  SpareOrderDTO
> {}
