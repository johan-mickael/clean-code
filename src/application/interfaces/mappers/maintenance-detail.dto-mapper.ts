import MaintenanceDetail from '@triumph/domain/entity/maintenance-detail';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';

import MaintenanceDetailDTO from '../dtos/maintenance-detail.dto';

export default class MaintenanceDetailDTOMapper {
  static toDTO(maintenanceDetailEntity: MaintenanceDetail): MaintenanceDetailDTO {
    return new MaintenanceDetailDTO(
      maintenanceDetailEntity.id,
      maintenanceDetailEntity.label,
      maintenanceDetailEntity.maintenanceId,
      maintenanceDetailEntity.sparePartId,
      maintenanceDetailEntity.maintenanceType,
      maintenanceDetailEntity.price,
      maintenanceDetailEntity.comments,
    );
  }

  static toEntity(maintenanceDetailDTO: MaintenanceDetailDTO): MaintenanceDetail {
    const { id, label, maintenanceId, sparePartId, maintenanceType, price, comments } = maintenanceDetailDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new MaintenanceDetail(id, label, maintenanceId, sparePartId, maintenanceType, price, comments);
  }
}
