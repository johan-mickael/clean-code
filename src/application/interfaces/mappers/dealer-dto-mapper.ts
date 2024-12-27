import { Occupation } from '@triumph/domain/entity/occupation';
import { Dealer } from '@triumph/domain/entity/dealer';
import DealerDTO from '../dtos/dealer-dto';

export default class DealerDTOMapper {
  static toDTO(dealerEntity: Dealer): DealerDTO {
    return new DealerDTO(dealerEntity.id.toString(), dealerEntity.name, dealerEntity.address);
  }

  static toEntity(dealerDTO: DealerDTO): Occupation {
    return new Dealer(dealerDTO.id, dealerDTO.name, dealerDTO.address);
  }
}
