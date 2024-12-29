import { BikeModel } from '@triumph/domain/entity/bike-model';

import BaseRepositoryWriter from './base-repository-writer';
import BikeModelDTO from '../../../interfaces/dtos/bike-model-dto';

export default abstract class BikeModelRepositoryWriter extends BaseRepositoryWriter<BikeModel, BikeModelDTO> {}
