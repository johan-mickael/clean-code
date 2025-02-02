import DrivingIncidentEntity from '@triumph/domain/entity/driving-incident';

import DrivingIncidentDTO from '../../../interfaces/dtos/driving-incident.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class DrivingIncidentRepositoryWriter extends BaseRepositoryWriter<
  DrivingIncidentEntity,
  DrivingIncidentDTO
> {}
