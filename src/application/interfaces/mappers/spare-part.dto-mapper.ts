import SparePart from '@triumph/domain/entity/spare-part';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';
import SparePartDTO from '../dtos/spare-part.dto';

export default class SparePartDTOMapper {
  static toDTO(sparePartEntity: SparePart): SparePartDTO {
    return new SparePartDTO(
      sparePartEntity.id,
      sparePartEntity.name,
      sparePartEntity.price,
      sparePartEntity.quantity,
    );
  }

  static toEntity(sparePartDTO: SparePartDTO): SparePart {
    const { id, name, price, quantity } = sparePartDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new SparePart(id, name, price, quantity);
  }
}
