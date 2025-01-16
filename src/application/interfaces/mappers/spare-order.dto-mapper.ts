import SpareOrder from '@triumph/domain/entity/spare-order';
import InvalidIdentifierError from '@triumph/domain/errors/common/invalid-identifier.error';
import SpareOrderDTO from '../dtos/spare-order.dto';

export default class SpareOrderDTOMapper {
  static toDTO(spareOrderEntity: SpareOrder): SpareOrderDTO {
    return new SpareOrderDTO(
      spareOrderEntity.id,
      spareOrderEntity.spareId,
      spareOrderEntity.quantity,
      spareOrderEntity.price,
      spareOrderEntity.deliveryDelayDays,
    );
  }

  static toEntity(spareOrderDTO: SpareOrderDTO): SpareOrder {
    const { id, spareId, quantity, price, deliveryDelayDays } = spareOrderDTO;

    if (!id) {
      throw new InvalidIdentifierError();
    }

    return new SpareOrder(id, spareId, quantity, price, deliveryDelayDays);
  }
}
