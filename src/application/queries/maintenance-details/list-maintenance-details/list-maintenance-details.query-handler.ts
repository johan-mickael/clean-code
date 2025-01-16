import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import MaintenanceDetailDTOMapper from '../../../interfaces/mappers/maintenance-detail.dto-mapper';
import MaintenanceDetailRepositoryReader from '../../../ports/repositories/readers/maintenance-detail-repository-reader';
import ListMaintenanceDetailsQuery from './list-maintenance-details.query';

export default class ListMaintenanceDetailsQueryHandler {
  constructor(private readonly maintenanceDetailRepositoryReader: MaintenanceDetailRepositoryReader) {}

  async execute(listMaintenanceDetailsQuery: ListMaintenanceDetailsQuery): Promise<MaintenanceDetailDTO[]> {
    const details = await this.maintenanceDetailRepositoryReader.list();

    return details.map(MaintenanceDetailDTOMapper.toDTO);
  }
}
