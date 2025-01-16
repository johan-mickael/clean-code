import DrivingHistoryEntity from '@triumph/domain/entity/driving-history';
import DrivingHistoryDTO from '../../../interfaces/dtos/driving-history.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class DrivingHistoryRepositoryWriter extends BaseRepositoryWriter<DrivingHistoryEntity, DrivingHistoryDTO> {}
