import DrivingHistory from '@triumph/domain/entity/driving-history';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';
import DrivingHistoryDTO from '../dtos/driving-history.dto';

export default class DrivingHistoryDTOMapper {
  static toDTO(drivingHistoryEntity: DrivingHistory): DrivingHistoryDTO {
    return new DrivingHistoryDTO(
      drivingHistoryEntity.id,
      drivingHistoryEntity.driverId,
      drivingHistoryEntity.bikeId,
      drivingHistoryEntity.label,
    );
  }

  static toEntity(drivingHistoryDTO: DrivingHistoryDTO): DrivingHistory {
    const { id, driverId, bikeId, label } = drivingHistoryDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new DrivingHistory(id, driverId, bikeId, label);
  }
}
