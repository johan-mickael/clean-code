import { Partner } from '@triumph/domain/entity/partner';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';

import PartnerDTO from '../dtos/partner.dto';

export default class PartnerDTOMapper {
  static toDTO(partnerEntity: Partner): PartnerDTO {
    return new PartnerDTO(partnerEntity.id, partnerEntity.name, partnerEntity.email, partnerEntity.dealerId);
  }

  static toEntity(partnerDTO: PartnerDTO): Partner {
    const { id, name, email, dealerId } = partnerDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new Partner(id, name, email, dealerId);
  }
}
