import DrivingIncident from '@triumph/domain/entity/driving-incident';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';
import DrivingIncidentDTO from '../dtos/driving-incident.dto';

export default class DrivingIncidentDTOMapper {
  static toDTO(drivingIncidentEntity: DrivingIncident): DrivingIncidentDTO {
    return new DrivingIncidentDTO(
      drivingIncidentEntity.id,
      drivingIncidentEntity.drivingHistoryId,
      drivingIncidentEntity.label,
      drivingIncidentEntity.comments,
    );
  }

  static toEntity(drivingIncidentDTO: DrivingIncidentDTO): DrivingIncident {
    const { id, drivingHistoryId, label, comments } = drivingIncidentDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new DrivingIncident(id, drivingHistoryId, label, comments);
  }
}
