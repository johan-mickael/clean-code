import { Occupation } from '@triumph/domain/entity/occupation';
import OccupationDTO from './occupation-dto';

export default class OccupationDTOMapper {
  static toDTO(occupationEntity: Occupation): OccupationDTO {
    return new OccupationDTO(occupationEntity.id.toString(), occupationEntity.name);
  }

  static toEntity(occupationDTO: OccupationDTO): Occupation {
    return new Occupation(parseInt(occupationDTO.id), occupationDTO.name);
  }
}
