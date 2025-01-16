import SpareOrderDTO from '../../../interfaces/dtos/spare-order.dto';
import GetSpareOrderByIdentifierQuery from './get-spare-order-by-identifier.query';

export default abstract class GetSpareOrderByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws SpareOrderNotFoundError
   */
  abstract execute(getSpareOrderByIdentifierQuery: GetSpareOrderByIdentifierQuery): Promise<SpareOrderDTO>;
}
