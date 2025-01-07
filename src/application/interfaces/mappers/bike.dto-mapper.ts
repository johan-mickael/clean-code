import Bike from '@triumph/domain/entity/bike';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';

import BikeDTO from '../dtos/bike.dto';

export default class BikeDTOMapper {
  static toDTO(bikeEntity: Bike): BikeDTO {
    return new BikeDTO(
      bikeEntity.id,
      bikeEntity.bikeModelId,
      bikeEntity.partnerId,
      bikeEntity.mileage,
      bikeEntity.status,
      bikeEntity.circulationDate,
    );
  }

  static toEntity(bikeDTO: BikeDTO): Bike {
    const { id, bikeModelId, partnerId, mileage, status, circulationDate } = bikeDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new Bike(id, bikeModelId, partnerId, mileage, status, circulationDate);
  }
}
