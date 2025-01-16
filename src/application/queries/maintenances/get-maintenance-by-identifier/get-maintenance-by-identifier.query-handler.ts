import MaintenanceDTO from '../../../interfaces/dtos/maintenance.dto';
import MaintenanceDTOMapper from '../../../interfaces/mappers/maintenance.dto-mapper';
import MaintenanceRepositoryReader from '../../../ports/repositories/readers/maintenance-repository-reader';
import GetMaintenanceByIdQuery from './get-maintenance-by-identifier.query';
import { MaintenanceNotFoundError } from '@triumph/domain/errors/maintenances/maintenance-not-found.error';

export default class GetMaintenanceByIdQueryHandler {
  constructor(private readonly maintenanceRepository: MaintenanceRepositoryReader) {}

  async execute(getMaintenanceByIdQuery: GetMaintenanceByIdQuery): Promise<MaintenanceDTO> {
    const maintenanceIdInput = getMaintenanceByIdQuery.id;
    const foundMaintenance = await this.maintenanceRepository.getById(maintenanceIdInput);

    if (foundMaintenance !== null) {
      return MaintenanceDTOMapper.toDTO(foundMaintenance);
    }

    throw new MaintenanceNotFoundError();
  }
}
