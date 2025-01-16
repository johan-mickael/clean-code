import SparePartDTO from '../../../interfaces/dtos/spare-part.dto';
import GetSparePartByIdentifierQuery from './get-spare-part-by-identifier.query';

export default abstract class GetSparePartByIdentifierUseCase {
  /**
   * @throws InvalidQueryError
   * @throws SparePartNotFoundError
   */
  abstract execute(getSparePartByIdentifierQuery: GetSparePartByIdentifierQuery): Promise<SparePartDTO>;
}
