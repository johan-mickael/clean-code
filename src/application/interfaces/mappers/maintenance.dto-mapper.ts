import Maintenance from '@triumph/domain/entity/maintenance';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';
import MaintenanceDTO from '../dtos/maintenance.dto';

export default class MaintenanceDTOMapper {
  static toDTO(maintenanceEntity: Maintenance): MaintenanceDTO {
    return new MaintenanceDTO(
      maintenanceEntity.id,
      maintenanceEntity.label,
      maintenanceEntity.bikeId,
      maintenanceEntity.lastMaintenanceDate,
      maintenanceEntity.nextMaintenanceDate,
      maintenanceEntity.maintenanceType,
    );
  }

  static toEntity(maintenanceDTO: MaintenanceDTO): Maintenance {
    const { id, label, bikeId, lastMaintenanceDate, nextMaintenanceDate, maintenanceType } = maintenanceDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new Maintenance(id, label, bikeId, lastMaintenanceDate, nextMaintenanceDate, maintenanceType);
  }
}
