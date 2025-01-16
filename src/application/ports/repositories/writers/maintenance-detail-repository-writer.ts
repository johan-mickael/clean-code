import MaintenanceDetailEntity from '@triumph/domain/entity/maintenance-detail';
import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class MaintenanceDetailRepositoryWriter extends BaseRepositoryWriter<MaintenanceDetailEntity, MaintenanceDetailDTO> {}
