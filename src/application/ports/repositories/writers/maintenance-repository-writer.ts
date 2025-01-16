import MaintenanceEntity from '@triumph/domain/entity/maintenance';
import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import BaseRepositoryWriter from './base.repository-writer';

export default abstract class MaintenanceRepositoryWriter extends BaseRepositoryWriter<MaintenanceEntity, MaintenanceDTO> {}
