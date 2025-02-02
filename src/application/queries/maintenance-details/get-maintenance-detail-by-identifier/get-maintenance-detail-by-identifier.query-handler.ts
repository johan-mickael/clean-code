import { MaintenanceDetailNotFoundError } from '@triumph/domain/errors/maintenance-details/maintenance-detail-not-found.error';

import MaintenanceDetailDTO from '../../../interfaces/dtos/maintenance-detail.dto';
import MaintenanceDetailDTOMapper from '../../../interfaces/mappers/maintenance-detail.dto-mapper';
import MaintenanceDetailRepositoryReader from '../../../ports/repositories/readers/maintenance-detail-repository-reader';
import GetMaintenanceDetailByIdQuery from './get-maintenance-detail-by-identifier.query';

export default class GetMaintenanceDetailByIdQueryHandler {
  constructor(private readonly maintenanceDetailRepository: MaintenanceDetailRepositoryReader) {}

  async execute(getMaintenanceDetailByIdQuery: GetMaintenanceDetailByIdQuery): Promise<MaintenanceDetailDTO> {
    const maintenanceDetailIdInput = getMaintenanceDetailByIdQuery.id;
    const foundDetail = await this.maintenanceDetailRepository.getById(maintenanceDetailIdInput);

    if (foundDetail !== null) {
      return MaintenanceDetailDTOMapper.toDTO(foundDetail);
    }

    throw new MaintenanceDetailNotFoundError();
  }
}
