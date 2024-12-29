import { Occupation } from '@triumph/domain/entity/occupation';
import { Partner } from '@triumph/domain/entity/partner';
import PartnerDTO from '../dtos/partner-dto';

export default class PartnerDTOMapper {
  static toDTO(partnerEntity: Partner): PartnerDTO {
    return new PartnerDTO(partnerEntity.id, partnerEntity.name, partnerEntity.email, partnerEntity.dealerId);
  }

  static toEntity(partnerDTO: PartnerDTO): Partner {
    return new Partner(partnerDTO.id, partnerDTO.name, partnerDTO.email, partnerDTO.dealerId);
  }
}
