import BikeEntity from '@triumph/domain/entity/bike';

import BikeDTO from '../../../interfaces/dtos/bike.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class BikeRepositoryWriter extends BaseRepositoryWriter<BikeEntity, BikeDTO> {}
