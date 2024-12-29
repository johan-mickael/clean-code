import { BikeModel } from '@triumph/domain/entity/bike-model';

import BikeModelDTO from '../../../interfaces/dtos/bike-model.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class BikeModelRepositoryWriter extends BaseRepositoryWriter<BikeModel, BikeModelDTO> {}
