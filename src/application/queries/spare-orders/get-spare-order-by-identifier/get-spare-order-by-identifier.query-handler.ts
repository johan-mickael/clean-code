import { SpareOrderNotFoundError } from '@triumph/domain/errors/spare-orders/spare-order-not-found.error';

import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import SpareOrderDTOMapper from '../../../interfaces/mappers/spare-order.dto-mapper';
import SpareOrderRepositoryReader from '../../../ports/repositories/readers/spare-order-repository-reader';
import GetSpareOrderByIdQuery from './get-spare-order-by-identifier.query';

export default class GetSpareOrderByIdQueryHandler {
  constructor(private readonly spareOrderRepository: SpareOrderRepositoryReader) {}

  async execute(getSpareOrderByIdQuery: GetSpareOrderByIdQuery): Promise<SpareOrderDTO> {
    const spareOrderIdInput = getSpareOrderByIdQuery.id;
    const foundSpareOrder = await this.spareOrderRepository.getById(spareOrderIdInput);

    if (foundSpareOrder !== null) {
      return SpareOrderDTOMapper.toDTO(foundSpareOrder);
    }

    throw new SpareOrderNotFoundError();
  }
}
