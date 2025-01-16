import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import ListSpareOrdersQuery from './list-spare-orders.query';

export default abstract class ListSpareOrdersUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(listSpareOrdersQuery: ListSpareOrdersQuery): Promise<SpareOrderDTO[]>;
}
