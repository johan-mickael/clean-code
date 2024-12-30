import PartnerDTO from '../../../interfaces/dtos/partner.dto';
import ListPartnersQuery from './list-partners.query';

export default abstract class ListPartnersUseCase {
  /**
   * @throws InvalidQueryError
   */
  abstract execute(query: ListPartnersQuery): Promise<PartnerDTO[]>;
}
