import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import GetPartnerByIdentifierQuery from './get-partner-by-identifier.query';

export default abstract class GetPartnerByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws PartnerNotFoundError
   */
  abstract execute(getPartnerByIdentifierQuery: GetPartnerByIdentifierQuery): Promise<PartnerDTO>;
}
