import DealerDTO from '../../../interfaces/dtos/dealer.dto';
import GetDealerByIdentifierQuery from './get-dealer-by-identifier.query';

export default abstract class GetDealerByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws DealerNotFoundError
   */
  abstract execute(getDealerByIdentifierQuery: GetDealerByIdentifierQuery): Promise<DealerDTO>;
}
