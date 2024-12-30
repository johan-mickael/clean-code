import DealerDTO from '../../../interfaces/dtos/dealer.dto';
import ListDealersQuery from './list-dealers.query';

export default abstract class ListDealersUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(query: ListDealersQuery): Promise<DealerDTO[]>;
}
