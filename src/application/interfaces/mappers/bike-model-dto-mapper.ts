import { Occupation } from '@triumph/domain/entity/occupation';
import { BikeModel } from '@triumph/domain/entity/bike-model';
import BikeModelDTO from '../dtos/bike-model-dto';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier-error';

export default class BikeModelDTOMapper {
  static toDTO(bikeModelEntity: BikeModel): BikeModelDTO {
    return new BikeModelDTO(bikeModelEntity.id, bikeModelEntity.name);
  }

  static toEntity(bikeModelDTO: BikeModelDTO): BikeModel {
    if (!bikeModelDTO.id) {
      throw new InvalidIdentifierError();
    }

    return new BikeModel(bikeModelDTO.id, bikeModelDTO.name);
  }
}
