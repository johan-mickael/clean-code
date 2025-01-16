import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import SpareOrderDTOMapper from '../../../interfaces/mappers/spare-order.dto-mapper';
import SpareOrderRepositoryReader from '../../../ports/repositories/readers/spare-order-repository-reader';
import ListSpareOrdersQuery from './list-spare-orders.query';

export default class ListSpareOrdersQueryHandler {
  constructor(private readonly spareOrderRepositoryReader: SpareOrderRepositoryReader) {}

  async execute(listSpareOrdersQuery: ListSpareOrdersQuery): Promise<SpareOrderDTO[]> {
    const spareOrders = await this.spareOrderRepositoryReader.list();

    return spareOrders.map(SpareOrderDTOMapper.toDTO);
  }
}
