import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import MaintenanceDTOMapper from '../../../interfaces/mappers/maintenance.dto-mapper';
import MaintenanceRepositoryReader from '../../../ports/repositories/readers/maintenance-repository-reader';
import ListMaintenancesQuery from './list-maintenances.query';

export default class ListMaintenancesQueryHandler {
  constructor(private readonly maintenanceRepositoryReader: MaintenanceRepositoryReader) {}

  async execute(listMaintenancesQuery: ListMaintenancesQuery): Promise<MaintenanceDTO[]> {
    const maintenances = await this.maintenanceRepositoryReader.list();

    return maintenances.map(MaintenanceDTOMapper.toDTO);
  }
}
