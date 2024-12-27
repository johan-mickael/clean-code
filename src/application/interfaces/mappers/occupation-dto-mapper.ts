import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationDTO from '../dtos/occupation-dto';

export default class OccupationDTOMapper {
  static toDTO(occupationEntity: Occupation): OccupationDTO {
    return new OccupationDTO(occupationEntity.id, occupationEntity.name);
  }

  static toEntity(occupationDTO: OccupationDTO): Occupation {
    return new Occupation(occupationDTO.id, occupationDTO.name);
  }
}
